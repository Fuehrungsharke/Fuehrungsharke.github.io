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

Drawable.prototype.item = null;
Drawable.prototype.dim = new Dim(0, 0);

function Drawable(item, dim) {
    if (item != null)
        this.item = item;
    if (dim != null)
        this.dim = dim;
}

async function getSign(root) {
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

async function getSignSvg(root, uuid, inactiveInherited) {
    let signSvg = document.createElement('g');
    signSvg.setAttribute('uuid', uuid);
    if (root.inactive || inactiveInherited)
        signSvg.setAttribute('opacity', 0.25);
    signSvg.classList.add('draggable');
    signSvg.classList.add('editable');
    signSvg.classList.add('selectable');

    let sign = new DOMParser().parseFromString(await getSign(root), "text/xml").getElementsByTagName("svg")[0];
    sign.setAttribute('touch-action', 'none');
    sign.setAttribute('onpointerover', `pointerOverSvg('${uuid}')`);
    sign.setAttribute('onpointerout', `pointerOutSvg('${uuid}')`);

    for (const element of sign.getElementsByTagName('text'))
        splitText(sign, element);
    for (const element of sign.getElementsByTagName('text'))
        adjustTextSize(sign, element);

    signSvg.innerHTML = sign.outerHTML;
    return signSvg;
}

async function getLine(ax, ay, bx, by, inactive, color) {
    let line = document.createElement('path');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('stroke', 'black');
    line.setAttribute('d', `M${ax} ${ay} L${bx} ${by}`);
    if (inactive)
        line.setAttribute('opacity', 0.25);
    if (color != null)
        line.setAttribute('stroke', color);
    return line;
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

async function drawSign(root, inactiveInherited) {
    if (root?.sign == null)
        return null;
    let uuid = createUUID();
    root.uuid = uuid;
    let itemBoxPromise = getSignSvg(root, uuid, inactiveInherited);
    let dimSign = new Dim(0, 0);
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
    return new Drawable(await itemBoxPromise, dimSign);
}

async function addToCanvas(canvas, drawable, x, y) {
    drawable.dim.x = x;
    drawable.dim.y = y;
    drawable.item.setAttribute('transform', `translate(${drawable.dim.x}, ${drawable.dim.y}) scale(1 1)`);
    canvas.appendChild(drawable.item);
}

async function drawListRight(canvas, dim, dimSign, promiseSub) {
    if (promiseSub == null)
        return;

    let orgWidth = dim.width;
    let orgHeight = dim.height;
    let firstAnchorY = null;
    let lastAnchorY = 0;
    let drawables = await promiseSub;
    dim.height = 0;
    for (let idx in drawables) {
        let drawable = drawables[idx];
        addToCanvas(canvas, drawable, orgWidth + 2 * GAP, dim.height);

        let itemLine = getLine(
            orgWidth + GAP,
            dim.height + drawable.dim.anchorLeftY,
            orgWidth + 2 * GAP,
            dim.height + drawable.dim.anchorLeftY,
            false,
            null
        );
        canvas.appendChild(await itemLine);

        dim.width = Math.max(dim.width, orgWidth + 2 * GAP + drawable.dim.width);
        dim.height += drawable.dim.height;
        if (firstAnchorY == null)
            firstAnchorY = drawable.dim.anchorLeftY;
        lastAnchorY = Math.max(lastAnchorY, drawable.dim.y + drawable.dim.anchorLeftY);
    }

    let groupLine = getLine(
        orgWidth + GAP,
        firstAnchorY,
        orgWidth + GAP,
        lastAnchorY,
        false,
        null
    );
    canvas.appendChild(await groupLine);

    let mainLine = getLine(
        orgWidth,
        dim.anchorLeftY,
        orgWidth + GAP,
        dim.anchorLeftY,
        false,
        null
    );
    canvas.appendChild(await mainLine);

    dim.height = Math.max(orgHeight, dim.height);
}

async function drawListRightBelow(canvas, dim, dimSign, promiseSub) {
    if (promiseSub == null)
        return;

    let height = dim.height;
    let lastAnchorY = 0;
    let drawables = await promiseSub;
    for (let idx in drawables) {
        let drawable = drawables[idx];
        addToCanvas(canvas, drawable, dim.anchorTopX + GAP, dim.height);

        let itemLine = getLine(
            dim.anchorTopX,
            dim.height + drawable.dim.anchorLeftY,
            dim.anchorTopX + GAP,
            dim.height + drawable.dim.anchorLeftY,
            false,
            null
        );
        canvas.appendChild(await itemLine);

        dim.width = Math.max(dim.width, drawable.dim.width);
        dim.height += drawable.dim.height;
        lastAnchorY = Math.max(lastAnchorY, drawable.dim.y + drawable.dim.anchorLeftY);
    }

    let groupLine = getLine(
        dim.anchorTopX,
        height,
        dim.anchorTopX,
        lastAnchorY,
        false,
        null
    );
    canvas.appendChild(await groupLine);
}

async function drawRowRight(canvas, dim, dimSign, promiseSub) {
    if (promiseSub == null)
        return;

    let line = await getLine(
        dim.width,
        dimSign.anchorLeftY,
        dim.width + 2 * GAP,
        dimSign.anchorLeftY,
        false,
        null
    );
    canvas.appendChild(line);
    dim.width += 2 * GAP;
    let drawableSub = await promiseSub;
    for (let idx in drawableSub) {
        let drawable = drawableSub[idx];
        addToCanvas(canvas, drawable, dim.width, 0);
        dim.width += drawable.dim.width;
        dim.height = Math.max(dim.height, drawable.dim.height);
    }
    return new Drawable(canvas, dim);
}

async function drawRowRightBelow(root, inactiveInherited) {
    let dim = new Dim(x, y);
    let dimSign = await drawSign(root, inactiveInherited);
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
            let leafDimensions = await drawVerticalList(canvas, leafs[leaf], x + dim.width + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
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

async function drawCenteredRight(root, inactiveInherited) {
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
            let dimSubItem = await drawVerticalList(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
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

async function drawCenteredBelow(root, inactiveInherited) {
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
            let dimSubItem = await drawVerticalList(canvas, root.sub[idx], x + dim.width, y + subY + GAP, root.inactive || inactiveInherited);
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

async function drawLayout(root, inactiveInherited) {
    let promiseSign = drawSign(root, inactiveInherited);
    if (root.sign == 'Collapsed')
        return await promiseSign;

    let promiseWith = null;
    if (root.with != null && Array.isArray(root.with) && root.with.length > 0)
        promiseWith = drawHorizontalList(root.with, inactiveInherited);
    let promiseSub = null;
    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0)
        promiseSub = Promise.all(root.sub.map(item => drawLayout(item, inactiveInherited)));

    let dim = new Dim(0, 0);
    let canvas = document.createElement('g');
    let drawableSign = await promiseSign;
    canvas.appendChild(drawableSign.item);
    dim.anchorTopX = drawableSign.dim.anchorTopX;
    dim.anchorTopY = drawableSign.dim.anchorTopY;
    dim.anchorLeftX = drawableSign.dim.anchorLeftX;
    dim.anchorLeftY = drawableSign.dim.anchorLeftY;
    dim.width = drawableSign.dim.width;
    dim.height = drawableSign.dim.height;

    if (promiseWith != null) {
        let drawableWith = await promiseWith;
        addToCanvas(canvas, drawableWith, dim.width, 0);
        dim.width += drawableWith.dim.width;
        dim.height = Math.max(dim.height, drawableWith.dim.height);
    }

    if (promiseSub != null) {
        let layoutFunc = null;
        switch (root.layout) {
            case Layout.ListRightBelow:
                layoutFunc = drawListRightBelow;
                break;
            case Layout.RowRight:
                layoutFunc = drawRowRight;
                break;
            case Layout.RowRightBelow:
                layoutFunc = drawRowRightBelow;
                break;
            case Layout.CenteredRight:
                layoutFunc = drawCenteredRight;
                break;
            case Layout.CenteredBelow:
                layoutFunc = drawCenteredBelow;
                break;
            case Layout.ListRight:
            default:
                layoutFunc = drawListRight;
                break;
        }
        await layoutFunc(canvas, dim, drawableSign.dim, promiseSub);
    }

    return new Drawable(canvas, dim);
}

async function drawHorizontalList(root, inactiveInherited) {
    if (root == null)
        return null;
    if (Array.isArray(root) && root.length > 0) {
        let drawables = await Promise.all(root.map(item => drawLayout(item, inactiveInherited)));
        let dim = new Dim(0, 0);
        let canvas = document.createElement('g');
        for (let idx in drawables) {
            let drawable = drawables[idx];
            dim.height = Math.max(dim.height, drawable.dim.height);
            drawable.dim.x = dim.width;
            drawable.item.setAttribute('transform', `translate(${drawable.dim.x}, 0) scale(1 1)`);
            canvas.appendChild(drawable.item);
            dim.width += drawable.dim.width;
        }
        return new Drawable(canvas, dim);
    }
    else
        return drawLayout(root, inactiveInherited);
}

async function drawVerticalList(root, inactiveInherited) {
    if (root == null)
        return null;
    if (Array.isArray(root) && root.length > 0) {
        let drawables = await Promise.all(root.map(item => drawLayout(item, inactiveInherited)));
        let dim = new Dim(0, 0);
        let canvas = document.createElement('g');
        for (let idx in drawables) {
            let drawable = drawables[idx];
            dim.width = Math.max(dim.width, drawable.dim.width);
            drawable.dim.y = dim.height;
            drawable.item.setAttribute('transform', `translate(0, ${drawable.dim.y}) scale(1 1)`);
            canvas.appendChild(drawable.item);
            dim.height += drawable.dim.height;
        }
        return new Drawable(canvas, dim);
    }
    else
        return drawLayout(root, inactiveInherited);
}

async function draw() {
    configHistory.push({
        "config": JSON.parse(JSON.stringify(config))
    });

    let drawable = await drawVerticalList(config, false);

    let background = document.createElement('rect');
    background.setAttribute('stroke-width', 3);
    background.setAttribute('stroke', '#000');
    background.setAttribute('fill', '#FFF');
    background.setAttribute('x', 0);
    background.setAttribute('y', 0);
    background.setAttribute('width', drawable.dim.width);
    background.setAttribute('height', drawable.dim.height);

    let canvas = document.createElement('svg');
    canvas.appendChild(background);
    canvas.appendChild(drawable.item);

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', drawable.dim.width);
    outputSvg.setAttribute('height', drawable.dim.height + LINESIZE);

    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)

    // Display
    displaySvg.setAttribute('width', drawable.dim.width * zoomFactor);
    displaySvg.setAttribute('height', drawable.dim.height * zoomFactor + LINESIZE);
}