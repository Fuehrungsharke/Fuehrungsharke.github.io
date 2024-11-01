import { GAP, LINESIZE } from './ui_const.mjs';
import { configHistory } from './history.mjs';
import { config } from './config.mjs';
import { createUUID } from './uuid.mjs';
import { zoomFactor } from './zoom/zoom.mjs';
import { getResourceAsync } from './resource_manager.mjs';
import { getStaff } from './staff.mjs';
import { pointerOverSvg, pointerOutSvg } from './dragdrop/dragdrop.mjs';

let Layout = {
    ListRight: "list-right",
    ListRightBelow: "list-right-below",
    RowRight: "row-right",
    RowRightBelow: "row-right-below",
    CenteredRight: "center-right",
    CenteredBelow: "center-below",
}

let noneScalables = {
    'extinguish': {
        'Building': true,
        'Flag': true,
        'Person': true,
        'Place': true,
        'Unit': true,
        'Vehicle': true
    },
    'medical': true
}

Dim.prototype.x = 0;
Dim.prototype.y = 0;
Dim.prototype.width = 0;
Dim.prototype.height = 0;
Dim.prototype.anchorTopX = 0;
Dim.prototype.anchorTopY = 0;
Dim.prototype.anchorLeftX = 0;
Dim.prototype.anchorLeftY = 0;

function Dim(x, y) {
    if (x != null)
        this.x = x;
    if (y != null)
        this.y = y;
}

export async function getSign(root) {
    let svg = null;
    if (root.sign == null)
        return null;
    if (root.sign.includes('/'))
        svg = await getResourceAsync(root.sign);
    else
        svg = await getResourceAsync(`/signs/${root.sign}.svg`);

    let matchesConditional = /\{\{(\w+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
    while (matchesConditional != null && matchesConditional.length == 4) {
        if (matchesConditional[1] in root)
            svg = svg.replace(matchesConditional[0], matchesConditional[2]);
        else
            svg = svg.replace(matchesConditional[0], matchesConditional[3]);
        matchesConditional = /\{\{(\w+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
    }

    for (let key in root) {
        let matchesGroup = /(\w+)\:(\w+)/g.exec(key);
        if (matchesGroup == null || matchesGroup.length != 3)
            continue;

        let keyName = matchesGroup[1];
        let symbolName = matchesGroup[2];

        let innerSvg = new DOMParser().parseFromString(await getResourceAsync(`/${keyName}/${symbolName}.svg`), "text/xml").getElementsByTagName("svg")[0];
        let innerG = document.createElement('g');
        innerG.innerHTML = innerSvg.outerHTML;

        let reSymbol = new RegExp(`\\{\\{${keyName}\\:([\\,\\w\\=\\d\\s]+)\\}\\}`, 'g');
        let matchesSymbol = reSymbol.exec(svg);
        if (matchesSymbol != null && matchesSymbol.length > 1) {
            let para = {};

            para.scale = true;
            if (symbolName in noneScalables) {
                if (typeof noneScalables[symbolName] == 'boolean')
                    para.scale = !noneScalables[symbolName];
                else if (root.sign in noneScalables[symbolName])
                    para.scale = !noneScalables[symbolName][root.sign];
            }

            let reParaAttrs = /([\w\_\d]+)\s*\=\s*([\w\_\d]+)/g;
            let paraAttr = reParaAttrs.exec(matchesSymbol[1]);
            while (paraAttr) {
                para[paraAttr[1]] = paraAttr[2];
                paraAttr = reParaAttrs.exec(matchesSymbol[1]);
            }
            let scale = 1;
            if (para.scale) {
                let symbolWidth = parseInt(innerSvg.getAttribute('width'));
                let symbolHeight = parseInt(innerSvg.getAttribute('height'));
                scale = Math.min(para.width / symbolWidth, para.height / symbolHeight);
                let posOffsetX = symbolWidth * scale / 2;
                let posOffsetY = symbolHeight * scale / 2;
                innerG.setAttribute('transform', `translate(${para.cx - posOffsetX}, ${para.cy - posOffsetY}) scale(${scale} ${scale})`)
            }

            let reScaleable = /scale\:(\d+)/g;
            let scaleable = reScaleable.exec(innerG.innerHTML);
            while (scaleable) {
                innerG.innerHTML = innerG.innerHTML.slice(0, scaleable.index)
                    + (para.scale ? (parseInt(scaleable[1]) / scale).toString() : scaleable[1])
                    + innerG.innerHTML.slice(scaleable.index + scaleable[0].length);
                scaleable = reScaleable.exec(innerG.innerHTML);
            }
            svg = svg.slice(0, matchesSymbol.index)
                + innerG.outerHTML
                + svg.slice(matchesSymbol.index + matchesSymbol[0].length);
        }
        svg = svg.replace(`{{${keyName}}}`, innerG.outerHTML);
    }
    for (let key in root) {
        let re = new RegExp(`(\{\{${key}\\s+)|(\\s+${key}\}\})`, 'g');
        svg = svg
            .replaceAll(`{{${key}}}`, root[key])
            .replaceAll(re, '');
    }

    svg = svg.replace(/\{\{\w+\}\}/g, '');

    let idxStart = svg.search(/{{\w+\s/g);
    let idxEnd = svg.indexOf('}}', svg.search(/\s\w+}}/g)) + 2;
    while (idxStart >= 0 && idxEnd >= 0 && idxStart < idxEnd) {
        svg = svg.slice(0, idxStart) + svg.slice(idxEnd);
        idxStart = svg.search(/{{\w+\s/g);
        idxEnd = svg.indexOf('}}', svg.search(/\s\w+}}/g)) + 2;
    }
    return svg.replace(/((\r\n|\n|\r)\s)*(\r\n|\n|\r)/gm, '\r\n');
}

function getClipPathOfElement(sign, element) {
    let clipPathName = element.getAttribute('clip-path');
    if (clipPathName == null)
        return null;
    let res = /url\(\#(\w+)\)/.exec(clipPathName);
    if (res.length != 2)
        return null;
    return sign.getElementById(res[1]);
}

function splitText(sign, element) {
    let textParts = element.textContent.split(', ');
    if (textParts.length <= 1)
        return;
    let clipPath = getClipPathOfElement(sign, element);
    let orgRect = clipPath?.firstElementChild;
    let orgHeight = parseInt(orgRect.getAttribute('height'));
    let orgRectY = parseInt(orgRect.getAttribute('y'));
    let textLines = '';
    for (let i = 0; i < textParts.length; i++) {
        let partHeight = orgHeight / textParts.length;
        let top = orgRectY + i * partHeight;
        let clonedClipPath = clipPath.cloneNode();
        let clipPathId = `${clonedClipPath.getAttribute('id')}${i + 1}`;
        clonedClipPath.setAttribute('id', clipPathId);
        let clonedText = element.cloneNode();
        clonedText.setAttribute('clip-path', `url(#${clipPathId})`);
        clonedText.setAttribute('y', top + partHeight / 2);
        clonedText.textContent = textParts[i];
        textLines = textLines.concat(clonedText.outerHTML);
        let clonedRect = orgRect.cloneNode();
        clonedRect.setAttribute('height', orgHeight / textParts.length);
        clonedRect.setAttribute('y', top);
        clonedClipPath.appendChild(clonedRect);
        clipPath.parentElement.appendChild(clonedClipPath);
    }
    sign.innerHTML = sign.innerHTML.replace(element.outerHTML, textLines);
}

function adjustTextSize(sign, element) {
    let clipBBox = getClipPathOfElement(sign, element)?.firstElementChild?.getBBox();
    let bbox = element.getBBox();
    let style = element.getAttribute('style');
    if (style == null)
        return;
    let fontsizePattern = /font\-size\:\s*(\d+)(\w+)/g;
    let fontsize = fontsizePattern.exec(style);
    if (fontsize?.length != 3)
        return;
    for (let i = 0; i < 1000 && fontsize[1] > 1 && (bbox.width >= clipBBox.width || bbox.height >= clipBBox.height); i++) {
        style = style.replace(fontsizePattern, `font-size: ${--fontsize[1]}${fontsize[2]}`);
        element.setAttribute('style', style);
        bbox = element.getBBox();
    }
}

async function getSignSvg(root, uuid, x, y, inactiveInherited) {
    let signSvg = document.createElement('g');
    signSvg.setAttribute('transform', `translate(${parseInt(x, 10)}, ${parseInt(y, 10)}) scale(1 1)`)
    signSvg.setAttribute('uuid', uuid);
    if (root.inactive || inactiveInherited)
        signSvg.setAttribute('opacity', 0.25);
    signSvg.classList.add('draggable');
    signSvg.classList.add('editable');
    signSvg.classList.add('selectable');

    let sign = new DOMParser().parseFromString(await getSign(root), "text/xml").getElementsByTagName("svg")[0];
    sign.setAttribute('touch-action', 'none');
    sign.setAttribute('onpointerover', evt => pointerOverSvg(uuid));
    sign.setAttribute('onpointerout', evt => pointerOutSvg(uuid));

    for (const element of sign.getElementsByTagName('text'))
        splitText(sign, element);
    for (const element of sign.getElementsByTagName('text'))
        adjustTextSize(sign, element);

    signSvg.innerHTML = sign.outerHTML;
    return signSvg;
}

function getLine(ax, ay, bx, by) {
    let line = document.createElement('path');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('stroke', 'black');
    line.setAttribute('d', `M${ax} ${ay} L${bx} ${by}`);
    return line;
}

function appendLine(canvas, root, inactiveInherited, ax, ay, bx, by, color) {
    let line = getLine(ax, ay, bx, by);
    if (root != null && (root.inactive || inactiveInherited))
        line.setAttribute('opacity', 0.25);
    if (color != null)
        line.setAttribute('stroke', color);
    canvas.appendChild(line);
}

function getText(uuid, text, x, y) {
    let txt = document.createElement('text');
    txt.setAttribute('x', x);
    txt.setAttribute('y', y);
    txt.setAttribute('font-size', 24);
    txt.setAttribute('font-family', 'Verdana');
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', 'black');
    txt.setAttribute('onclick', `editName('${uuid}')`);
    txt.setAttribute('uuid', uuid);
    txt.innerHTML = text;
    return txt;
}

async function drawSign(canvas, root, x, y, inactiveInherited) {
    let dimSign = new Dim(x, y);
    if (root == null)
        return dimSign;
    let uuid = createUUID();
    root.uuid = uuid;
    if (root.sign != null) {
        let itemBoxPromise = getSignSvg(root, uuid, x, y, inactiveInherited);
        dimSign.width = 256;
        dimSign.height = 256;
        dimSign.anchorTopX = 128;
        dimSign.anchorTopY = 0;
        dimSign.anchorLeftX = 0;
        dimSign.anchorLeftY = 128;
        if (root.show_staff) {
            dimSign.height += 20;
            let staff = getStaff(root);
            let staffText = document.createElement('text');
            staffText.innerHTML = `${staff[0]} / ${staff[1]} / ${staff[2]} / <tspan text-decoration='underline'>${staff[3]}</tspan>`;
            staffText.setAttribute('x', dimSign.width / 2);
            staffText.setAttribute('y', dimSign.height);
            staffText.setAttribute('font-family', 'Verdana');
            staffText.setAttribute('font-size', 22);
            staffText.setAttribute('text-anchor', 'middle');
            staffText.setAttribute('font-weight', 'bold');
            (await itemBoxPromise).appendChild(staffText);
            dimSign.height += 5;
        }
        if (root.name != null) {
            let nameParts = root['name'].split(', ');
            for (let namePart in nameParts) {
                dimSign.height += 24;
                (await itemBoxPromise).appendChild(getText(uuid, nameParts[namePart], dimSign.width / 2, dimSign.height));
                dimSign.height += 5;
            }
        }
        if (canvas != null) {
            canvas.appendChild(await itemBoxPromise);
            // Debug: Print Coords
            // let txt = getText(uuid, `(${x}, ${y})`, x, y + 24);
            // txt.setAttribute('text-anchor', 'left');
            // canvas.appendChild(txt);
        }
    }
    return dimSign;
}

async function drawWithHorizontally(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    if (root.with == null || !Array.isArray(root.with) || root.with.length <= 0)
        return dim;
    for (let idx in root.with) {
        let signDim = await drawSign(canvas, root.with[idx], x + dim.width, y, root.inactive || inactiveInherited);
        dim.width += signDim.width;
        dim.height = Math.max(dim.height, signDim.height);
    }
    return dim;
}

async function drawListRight(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    let dimWith = await drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        let subTrees = root.sub;
        let subTotalWidth = 0;
        dim.width += GAP;
        appendLine(canvas, root, inactiveInherited,
            x + dim.width + (root.right ? -GAP : 0),
            y + dimSign.anchorLeftY,
            x + dim.width + GAP,
            y + dimSign.anchorLeftY); // root line
        dim.width += GAP;
        let dimLastSub = null;
        for (let subTree in subTrees) {
            let subSize = await drawRecursive(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
            appendLine(canvas, root, inactiveInherited,
                x + dim.width,
                y + dim.height + subSize.anchorLeftY,
                x + dim.width + GAP + subSize.anchorLeftX + (subTrees[subTree].left ? GAP : 0),
                y + dim.height + subSize.anchorLeftY
            );
            subTotalWidth = Math.max(subTotalWidth, subSize.width + GAP);
            dim.height += subSize.height;
            dimLastSub = subSize;
        }
        dim.height = Math.max(dimSign.height, dimWith.height, dim.height);
        appendLine(canvas, root, inactiveInherited, x + dim.width, y + dimSign.anchorLeftY, x + dim.width, dimLastSub.y + dimLastSub.anchorLeftY); // group line
        dim.width += GAP;
        dim.width += subTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);
    return dim;
}

async function drawListRightBelow(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    let dimWith = await drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.height += Math.max(dimSign.height, dimWith.height);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        let subTrees = root.sub;
        let subTotalWidth = 0;
        if (subTrees.length > 0) {
            let dimLastSub = null;
            for (let subTree in subTrees) {
                let dimSubItem = await drawRecursive(canvas, subTrees[subTree], x + dim.width, y + dim.height, root.inactive || inactiveInherited);
                appendLine(canvas, root, inactiveInherited,
                    x + dimSign.anchorTopX,
                    y + dim.height + dimSubItem.anchorLeftY,
                    x + dim.width + dimSubItem.anchorLeftX - GAP + (subTrees[subTree].left ? GAP : 0),
                    y + dim.height + dimSubItem.anchorLeftY
                );
                subTotalWidth = Math.max(subTotalWidth, dimSubItem.width);
                dim.height += dimSubItem.height;
                dimLastSub = dimSubItem;
            }
            appendLine(canvas, root, inactiveInherited,
                x + dimSign.anchorTopX,
                y + dimSign.height,
                x + dimSign.anchorTopX,
                dimLastSub.y + dimLastSub.anchorLeftY
            );
            dim.width += GAP;
        }
        dim.width += Math.max(dimWith.width, subTotalWidth);
    }
    else
        dim.width += dimWith.width;
    return dim;
}

async function drawRowRight(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    let dimWith = await drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        dim.width += 4 * GAP;
        let leafsTotalWidth = 0;
        let leafsTotalRowHeight = 0;
        let leafRowWidth = 0;
        let cntLeafs = 0;
        let leafs = root.sub;
        let dimFirstSub = null;
        for (let leaf in leafs) {
            cntLeafs += 1;
            let leafDimensions = await drawRecursive(canvas, leafs[leaf], x + dim.width + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
            if (dimFirstSub == null)
                dimFirstSub = leafDimensions;
            leafRowWidth += leafDimensions.width;
            leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
            leafsTotalRowHeight = Math.max(leafsTotalRowHeight, leafDimensions.height);
            if (cntLeafs % 4 == 0 && leafs.length > cntLeafs + 1) {
                dim.height += leafsTotalRowHeight;
                leafRowWidth = 0;
                leafsTotalRowHeight = 0;
            }
        }
        dim.height += leafsTotalRowHeight;

        appendLine(canvas, root, inactiveInherited,
            x + dim.width - 3 * GAP + (root.right ? -GAP : 0),
            y + dim.anchorLeftY,
            x + dim.width - 2 * GAP,
            y + dim.anchorLeftY); // root line

        appendLine(canvas, root, inactiveInherited,
            x + dim.width - 2 * GAP,
            y + dimFirstSub.anchorLeftY,
            x + dim.width + dimFirstSub.anchorLeftX - GAP + (root.sub[0].left ? GAP : 0),
            y + dimFirstSub.anchorLeftY); // 1st item line

        dim.height = Math.max(dim.height, dimSign.height, dimWith.height);
        dim.width += leafsTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);
    return dim;
}

async function drawRowRightBelow(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    let dimWith = await drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    let maxSignWithHeight = Math.max(dimSign.height, dimWith.height);
    dim.height += maxSignWithHeight;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        let leafsTotalWidth = 0;
        let leafsTotalRowHeight = dimSign.height;
        let leafRowWidth = 0;
        let cntLeafs = 0;
        let leafs = root.sub;
        let dimFirstSub = null;
        for (let leaf in leafs) {
            cntLeafs += 1;
            let leafDimensions = await drawRecursive(canvas, leafs[leaf], x + dim.width + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
            if (dimFirstSub == null)
                dimFirstSub = leafDimensions;
            leafRowWidth += leafDimensions.width;
            leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
            leafsTotalRowHeight = Math.max(leafsTotalRowHeight, leafDimensions.height);
            if (cntLeafs % 4 == 0 && leafs.length > cntLeafs + 1) {
                dim.height += leafsTotalRowHeight;
                leafRowWidth = 0;
                leafsTotalRowHeight = 0;
            }
        }

        appendLine(canvas, root, inactiveInherited,
            x + dimSign.width / 2,
            y + dimSign.height,
            x + dimSign.width / 2,
            y + maxSignWithHeight + dimFirstSub.anchorLeftY
        ); // root line
        appendLine(canvas, root, inactiveInherited,
            x + dimSign.width / 2,
            y + maxSignWithHeight + dimFirstSub.anchorLeftY,
            x + dimSign.width + dimFirstSub.anchorLeftX - GAP + (root.sub[0].left ? GAP : 0),
            y + maxSignWithHeight + dimFirstSub.anchorLeftY
        ); // group line

        dim.height += leafsTotalRowHeight;
        dim.width += Math.max(dimWith.width, leafsTotalWidth);
    }
    else
        dim.width += dimWith.width;
    return dim;
}

async function drawCenteredRight(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(null, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;

    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    let dimWith = await drawWithHorizontally(null, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        let subTrees = root.sub;
        let subTotalWidth = 0;
        dim.width += 2 * GAP;
        let dimSubs = [];
        for (let subTree in subTrees) {
            let dimSubItem = await drawRecursive(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
            dimSubs.push(dimSubItem);
            appendLine(canvas, root, inactiveInherited,
                x + dim.width,
                y + dim.height + dimSubItem.anchorLeftY,
                x + dim.width + GAP + dimSubItem.anchorLeftX + (subTrees[subTree].left ? GAP : 0),
                y + dim.height + dimSubItem.anchorLeftY
            );
            subTotalWidth = Math.max(subTotalWidth, dimSubItem.width + GAP);
            dim.height += dimSubItem.height;
        }
        let sub1 = dimSubs[0];
        let subN = dimSubs[dimSubs.length - 1];
        dim.anchorLeftY = sub1.anchorLeftY + ((subN.y + subN.anchorLeftY) - (sub1.y + sub1.anchorLeftY)) / 2;
        dim.anchorTopY = sub1.anchorTopY + ((subN.y + subN.anchorLeftY) - (sub1.y + sub1.anchorLeftY)) / 2;
        dim.height = Math.max(dim.height,
            dim.anchorLeftY + dimSign.height - dimSign.anchorLeftY,
            dim.anchorLeftY + dimWith.height - dimSign.anchorLeftY);
        appendLine(canvas, root, inactiveInherited,
            x + dim.width - GAP + (root.right ? -GAP : 0),
            y + dim.anchorLeftY,
            x + dim.width,
            y + dim.anchorLeftY); // root line
        appendLine(canvas, root, inactiveInherited,
            x + dim.width,
            sub1.y + sub1.anchorLeftY,
            x + dim.width,
            subN.y + subN.anchorLeftY); // group line
        dim.width += GAP;
        dim.width += subTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);

    await drawSign(canvas, root, x, y + dim.anchorLeftY - dimSign.anchorLeftY, inactiveInherited);
    await drawWithHorizontally(canvas, root, x + dimSign.width, y + dim.anchorLeftY - dimSign.anchorLeftY, inactiveInherited);

    return dim;
}

async function drawCenteredBelow(canvas, root, x, y, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(null, root, 0, 0, false); // just measure dimensions
    let dimWith = await drawWithHorizontally(null, root, 0, 0, false);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.height = Math.max(dimSign.height, dimWith.height) + GAP;
    let subY = dim.height;
    let dimSubs = [];
    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        if (root.sub[0].sign == 'Collapsed')
            subY = dimSign.height;
        for (let idx in root.sub) {
            let dimSubItem = await drawRecursive(canvas, root.sub[idx], x + dim.width, y + subY + GAP, root.inactive || inactiveInherited);
            dimSubs.push(dimSubItem);
            appendLine(canvas, root, inactiveInherited, x + dim.width + dimSubItem.anchorTopX, y + subY, x + dim.width + dimSubItem.anchorTopX, y + subY + dimSubItem.anchorTopY + GAP);
            dim.width += dimSubItem.width + GAP;
            dim.height = Math.max(dim.height, subY + dimSubItem.height + GAP);
        }
        dim.width -= GAP;
        let anchorSub1 = dimSubs[0].x + dimSubs[0].anchorTopX;
        let anchorSubN = dimSubs[dimSubs.length - 1].x + dimSubs[dimSubs.length - 1].anchorTopX;
        dim.anchorTopX = dimSubs[0].anchorTopX + (anchorSubN - anchorSub1) / 2;
        appendLine(canvas, root, inactiveInherited,
            x + dim.anchorTopX,
            y + dimSign.height,
            x + dim.anchorTopX,
            y + subY); // root line
        appendLine(canvas, root, inactiveInherited, anchorSub1, y + subY, anchorSubN, y + subY); // group line
    }
    dim.anchorLeftX = dim.anchorTopX - dimSign.anchorTopX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    await drawSign(canvas, root, x + dim.anchorLeftX, y, inactiveInherited);
    await drawWithHorizontally(canvas, root, x + dim.anchorTopX + dimSign.anchorTopX, y, inactiveInherited);
    dim.width = Math.max(dim.width, dim.anchorLeftX + dimSign.width + dimWith.width + GAP);
    return dim;
}

async function drawLayout(canvas, root, x, y, inactiveInherited) {
    switch (root.layout) {
        case Layout.ListRightBelow:
            return drawListRightBelow(canvas, root, x, y, inactiveInherited);
        case Layout.RowRight:
            return drawRowRight(canvas, root, x, y, inactiveInherited);
        case Layout.RowRightBelow:
            return drawRowRightBelow(canvas, root, x, y, inactiveInherited);
        case Layout.CenteredRight:
            return drawCenteredRight(canvas, root, x, y, inactiveInherited);
        case Layout.CenteredBelow:
            return drawCenteredBelow(canvas, root, x, y, inactiveInherited);
        case Layout.ListRight:
        default:
            return drawListRight(canvas, root, x, y, inactiveInherited);
    }
}

async function drawRecursive(canvas, root, x, y, inactiveInherited) {
    if (Array.isArray(root) && root.length > 0) {
        let dim = new Dim(x, y);
        for (let idx in root) {
            let itemSize = await drawLayout(canvas, root[idx], x, y + dim.height, inactiveInherited);
            dim.width = Math.max(dim.width, itemSize.width);
            dim.height += itemSize.height;
        }
        return dim;
    }
    else
        return drawLayout(canvas, root, x, y, inactiveInherited);
}

export async function draw() {
    configHistory.push({
        "config": JSON.parse(JSON.stringify(config))
    });

    let canvas = document.createElement('svg');
    let canvasDim = await drawRecursive(canvas, config, 0, 0, false);

    let background = document.createElement('rect');
    if (cbxBorder.checked) {
        background.setAttribute('stroke-width', 3);
        background.setAttribute('stroke', '#000');
    }
    if (cbxBackground.checked)
        background.setAttribute('fill', '#FFF');
    else
        background.setAttribute('fill', 'transparent');
    background.setAttribute('x', 0);
    background.setAttribute('y', 0);
    background.setAttribute('width', canvasDim.width);
    background.setAttribute('height', canvasDim.height);
    canvas.prepend(background);

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', canvasDim.width);
    outputSvg.setAttribute('height', canvasDim.height + LINESIZE);

    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)

    // Display
    displaySvg.setAttribute('width', canvasDim.width * zoomFactor);
    displaySvg.setAttribute('height', canvasDim.height * zoomFactor + LINESIZE);
}