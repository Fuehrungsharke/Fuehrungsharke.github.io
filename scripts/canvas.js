var Layout = {
    ListRight: "list-right",
    ListRightBelow: "list-right-below",
    RowRight: "row-right",
    RowRightBelow: "row-right-below",
    CenteredRight: "center-right",
    CenteredBelow: "center-below",
}

var scaleMap = {
    'bridge': 'scale',
    'clear': 'scale',
    'extinguish': {
        'Boat': 'scale',
        'Hazard': 'scale',
        'Measure': 'scale',
    },
    'transport': 'scale',
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

function getSign(root) {
    var svg = null;
    if (root.sign == null)
        return null;
    if (root.sign.includes('/'))
        svg = getResource(root.sign);
    else
        svg = getResource(`/signs/${root.sign}.svg`);

    var matchesConditional = /\{\{([\w]+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
    while (matchesConditional != null && matchesConditional.length == 4) {
        if (matchesConditional[1] in root)
            svg = svg.replace(matchesConditional[0], matchesConditional[2]);
        else
            svg = svg.replace(matchesConditional[0], matchesConditional[3]);
        matchesConditional = /\{\{([\w]+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
    }

    for (var key in root) {
        var matchesGroup = /(\w+)\:(\w+)/g.exec(key);
        if (matchesGroup == null || matchesGroup.length != 3)
            continue;

        var keyName = matchesGroup[1];
        var symbolName = matchesGroup[2];

        var innerSvg = new DOMParser().parseFromString(getResource(`/${keyName}/${symbolName}.svg`), "text/xml").getElementsByTagName("svg")[0];
        var innerG = document.createElement('g');
        innerG.innerHTML = innerSvg.outerHTML;

        var reSymbol = new RegExp(`\\{\\{${keyName}\\:([\\,\\w\\=\\d\\s]+)\\}\\}`, 'g');
        var matchesSymbol = reSymbol.exec(svg);
        if (matchesSymbol != null && matchesSymbol.length > 1) {
            var para = {};

            if (symbolName in scaleMap) {
                if (scaleMap[symbolName] == 'scale')
                    para.scale = true;
                else if (root.sign in scaleMap[symbolName])
                    para.scale = scaleMap[symbolName][root.sign] == 'scale';
            }

            var reParaAttrs = /([\w\_\d]+)\s*\=\s*([\w\_\d]+)/g;
            var paraAttr = reParaAttrs.exec(matchesSymbol[1]);
            while (paraAttr) {
                para[paraAttr[1]] = paraAttr[2];
                paraAttr = reParaAttrs.exec(matchesSymbol[1]);
            }
            if (para.scale) {
                var scaleX = para.width / 256;
                var scaleY = para.height / 256;
                var scale = Math.min(scaleX, scaleY);
                var posOffset = 0;
                if (scaleX <= scaleY)
                    posOffset = para.width / 2;
                else
                    posOffset = para.height / 2;
                innerG.setAttribute('transform', `translate(${para.cx - posOffset}, ${para.cy - posOffset}) scale(${scale} ${scale})`)
            }

            var reScaleable = /scale\:(\d+)/g;
            var scaleable = reScaleable.exec(innerG.innerHTML);
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
    for (var key in root) {
        var re = new RegExp(`(\{\{${key}\\s+)|(\\s+${key}\}\})`, 'g');
        svg = svg
            .replaceAll(`{{${key}}}`, root[key])
            .replaceAll(re, '');
    }

    return svg
        .replace(/\{\{\w+\}\}/g, '')
        .replace(/{{\w+\s/g, '<!--')
        .replace(/\s\w+}}/g, '-->');
}

function getSignSvg(root, uuid, x, y, inactiveInherited) {
    var signSvg = document.createElement('g');
    signSvg.setAttribute('transform', `translate(${parseInt(x, 10)}, ${parseInt(y, 10)}) scale(1 1)`)
    signSvg.setAttribute('uuid', uuid);
    if (root.inactive || inactiveInherited)
        signSvg.setAttribute('opacity', 0.25);
    signSvg.classList.add('draggable');
    signSvg.classList.add('editable');
    signSvg.classList.add('selectable');

    var sign = new DOMParser().parseFromString(getSign(root), "text/xml").getElementsByTagName("svg")[0];
    sign.setAttribute('touch-action', 'none');
    sign.setAttribute('onpointerover', `pointerOverSvg('${uuid}')`);
    sign.setAttribute('onpointerout', `pointerOutSvg('${uuid}')`);
    signSvg.innerHTML = sign.outerHTML;
    return signSvg;
}

function getLine(ax, ay, bx, by) {
    var line = document.createElement('path');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('stroke', 'black');
    line.setAttribute('d', `M${ax} ${ay} L${bx} ${by}`);
    return line;
}

function appendLine(canvas, root, inactiveInherited, ax, ay, bx, by, color) {
    var line = getLine(ax, ay, bx, by);
    if (root != null && (root.inactive || inactiveInherited))
        line.setAttribute('opacity', 0.25);
    if (color != null)
        line.setAttribute('stroke', color);
    canvas.appendChild(line);
}

function getText(uuid, text, x, y) {
    var txt = document.createElement('text');
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

function drawSign(canvas, root, x, y, inactiveInherited) {
    var dimSign = new Dim(x, y);
    if (root == null)
        return dimSign;
    var uuid = createUUID();
    root.uuid = uuid;
    if (root.sign != null) {
        var itemBox = getSignSvg(root, uuid, x, y, inactiveInherited);
        dimSign.width = 256;
        dimSign.height = 256;
        dimSign.anchorTopX = 128;
        dimSign.anchorTopY = 0;
        dimSign.anchorLeftX = 0;
        dimSign.anchorLeftY = 128;
        if (root.show_staff) {
            var staff = getStaff(root);
            var staffText = document.createElement('text');
            staffText.innerHTML = `${staff[0]} / ${staff[1]} / ${staff[2]} / <tspan>${staff[3]}</tspan>`;
            staffText.classList.add('staff');
            staffText.setAttribute('x', dimSign.width / 2);
            staffText.setAttribute('y', dimSign.height);
            staffText.setAttribute('font-size', 22);
            staffText.setAttribute('font-family', 'Verdana');
            staffText.setAttribute('text-anchor', 'middle');
            itemBox.appendChild(staffText);
            dimSign.height += 32;
        }
        if (root.name != null) {
            var nameParts = root['name'].split(', ');
            for (let namePart in nameParts) {
                itemBox.appendChild(getText(uuid, nameParts[namePart], dimSign.width / 2, dimSign.height));
                dimSign.height += 24;
            }
        }
        if (canvas != null) {
            canvas.appendChild(itemBox);
            // Debug: Print Coords
            // var txt = getText(uuid, `(${x}, ${y})`, x, y + 24);
            // txt.setAttribute('text-anchor', 'left');
            // canvas.appendChild(txt);
        }
    }
    return dimSign;
}

function drawWithHorizontally(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    if (root.with == null || !Array.isArray(root.with) || root.with.length <= 0)
        return dim;
    root.with.forEach(item => {
        var signDim = drawSign(canvas, item, x + dim.width, y, root.inactive || inactiveInherited);
        dim.width += signDim.width;
        dim.height = Math.max(dim.height, signDim.height);
    });
    return dim;
}

function drawListRight(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        dim.width += GAP;
        appendLine(canvas, root, inactiveInherited, x + dim.width, y + dimSign.anchorLeftY, x + dim.width + GAP, y + dimSign.anchorLeftY); // root line
        dim.width += GAP;
        var dimLastSub = null;
        for (let subTree in subTrees) {
            var subSize = drawRecursive(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
            appendLine(canvas, root, inactiveInherited,
                x + dim.width,
                y + dim.height + subSize.anchorLeftY,
                x + dim.width + GAP + subSize.anchorLeftX,
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

function drawListRightBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.height += Math.max(dimSign.height, dimWith.height);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        if (subTrees.length > 0) {
            var dimLastSub = null;
            for (let subTree in subTrees) {
                var dimSubItem = drawRecursive(canvas, subTrees[subTree], x + dim.width, y + dim.height, root.inactive || inactiveInherited);
                appendLine(canvas, root, inactiveInherited,
                    x + dimSign.anchorTopX,
                    y + dim.height + dimSubItem.anchorLeftY,
                    x + dim.width + dimSubItem.anchorLeftX - GAP,
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

function drawRowRight(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        dim.width += 4 * GAP;
        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = 0;
        var leafRowWidth = 0;
        var cntLeafs = 0;
        var leafs = root.sub;
        var dimFirstSub = null;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + dim.width + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
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
            x + dim.width - 3 * GAP,
            y + dim.anchorLeftY,
            x + dim.width - 2 * GAP,
            y + dim.anchorLeftY); // root line

        appendLine(canvas, root, inactiveInherited,
            x + dim.width - 2 * GAP,
            y + dimFirstSub.anchorLeftY,
            x + dim.width + dimFirstSub.anchorLeftX - GAP,
            y + dimFirstSub.anchorLeftY); // 1st item line

        appendLine(canvas, root, inactiveInherited,
            x + dim.width - 2 * GAP,
            y + dim.anchorLeftY,
            x + dim.width - 2 * GAP,
            y + dimFirstSub.anchorLeftY); // group line

        dim.height = Math.max(dim.height, dimSign.height, dimWith.height);
        dim.width += leafsTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);
    return dim;
}

function drawRowRightBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    var maxSignWithHeight = Math.max(dimSign.height, dimWith.height);
    dim.height += maxSignWithHeight;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = dimSign.height;
        var leafRowWidth = 0;
        var cntLeafs = 0;
        var leafs = root.sub;
        var dimFirstSub = null;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + dim.width + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
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
        );
        appendLine(canvas, root, inactiveInherited,
            x + dimSign.width / 2,
            y + maxSignWithHeight + dimFirstSub.anchorLeftY,
            x + dimSign.width + dimFirstSub.anchorLeftX - GAP,
            y + maxSignWithHeight + dimFirstSub.anchorLeftY
        );

        dim.height += leafsTotalRowHeight;
        dim.width += Math.max(dimWith.width, leafsTotalWidth);
    }
    else
        dim.width += dimWith.width;
    return dim;
}

function drawCenteredRight(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(null, root, x, y, inactiveInherited);
    dim.anchorTopX = dimSign.anchorTopX;

    dim.anchorLeftX = dimSign.anchorLeftX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(null, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        dim.width += 2 * GAP;
        var dimSubs = [];
        for (let subTree in subTrees) {
            var dimSubItem = drawRecursive(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
            dimSubs.push(dimSubItem);
            appendLine(canvas, root, inactiveInherited,
                x + dim.width,
                y + dim.height + dimSubItem.anchorLeftY,
                x + dim.width + GAP + dimSubItem.anchorLeftX,
                y + dim.height + dimSubItem.anchorLeftY
            );
            subTotalWidth = Math.max(subTotalWidth, dimSubItem.width + GAP);
            dim.height += dimSubItem.height;
        }
        var sub1 = dimSubs[0];
        var subN = dimSubs[dimSubs.length - 1];
        dim.anchorLeftY = sub1.anchorLeftY + ((subN.y + subN.anchorLeftY) - (sub1.y + sub1.anchorLeftY)) / 2;
        dim.anchorTopY = sub1.anchorTopY + ((subN.y + subN.anchorLeftY) - (sub1.y + sub1.anchorLeftY)) / 2;
        dim.height = Math.max(dim.height,
            dim.anchorLeftY + dimSign.height - dimSign.anchorLeftY,
            dim.anchorLeftY + dimWith.height - dimSign.anchorLeftY);
        appendLine(canvas, root, inactiveInherited, x + dim.width - GAP, y + dim.anchorLeftY, x + dim.width, y + dim.anchorLeftY); // root line
        appendLine(canvas, root, inactiveInherited, x + dim.width, sub1.y + sub1.anchorLeftY, x + dim.width, subN.y + subN.anchorLeftY); // group line
        dim.width += GAP;
        dim.width += subTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);

    drawSign(canvas, root, x, y + dim.anchorLeftY - dimSign.anchorLeftY, inactiveInherited);
    drawWithHorizontally(canvas, root, x + dimSign.width, y + dim.anchorLeftY - dimSign.anchorLeftY, inactiveInherited);

    return dim;
}

function drawCenteredBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim(x, y);
    var dimSign = drawSign(null, root, 0, 0, false); // just measure dimensions
    var dimWith = drawWithHorizontally(null, root, 0, 0, false);
    dim.anchorTopX = dimSign.anchorTopX;
    dim.anchorTopY = dimSign.anchorTopY;
    dim.height = Math.max(dimSign.height, dimWith.height) + GAP;
    var subY = dim.height;
    var dimSubs = [];
    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        if (root.sub[0].sign == 'Collapsed')
            subY = dimSign.height;
        root.sub.forEach(subItem => {
            var dimSubItem = drawRecursive(canvas, subItem, x + dim.width, y + subY + GAP, root.inactive || inactiveInherited);
            dimSubs.push(dimSubItem);
            appendLine(canvas, root, inactiveInherited, x + dim.width + dimSubItem.anchorTopX, y + subY, x + dim.width + dimSubItem.anchorTopX, y + subY + dimSubItem.anchorTopY + GAP);
            dim.width += dimSubItem.width + GAP;
            dim.height = Math.max(dim.height, subY + dimSubItem.height + GAP);
        });
        dim.width -= GAP;
        var anchorSub1 = dimSubs[0].x + dimSubs[0].anchorTopX;
        var anchorSubN = dimSubs[dimSubs.length - 1].x + dimSubs[dimSubs.length - 1].anchorTopX;
        dim.anchorTopX = dimSubs[0].anchorTopX + (anchorSubN - anchorSub1) / 2;
        appendLine(canvas, root, inactiveInherited, x + dim.anchorTopX, y + dimSign.height, x + dim.anchorTopX, y + subY); // root line
        appendLine(canvas, root, inactiveInherited, anchorSub1, y + subY, anchorSubN, y + subY); // group line
    }
    dim.anchorLeftX = dim.anchorTopX - dimSign.anchorTopX;
    dim.anchorLeftY = dimSign.anchorLeftY;
    drawSign(canvas, root, x + dim.anchorLeftX, y, inactiveInherited);
    drawWithHorizontally(canvas, root, x + dim.anchorTopX + dimSign.anchorTopX, y, inactiveInherited);
    dim.width = Math.max(dim.width, dim.anchorLeftX + dimSign.width + dimWith.width + GAP);
    return dim;
}

function drawLayout(canvas, root, x, y, inactiveInherited) {
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

function drawRecursive(canvas, root, x, y, inactiveInherited) {
    if (Array.isArray(root) && root.length > 0) {
        var dim = new Dim(x, y);
        for (let idx in root) {
            var itemSize = drawLayout(canvas, root[idx], x, y + dim.height, inactiveInherited);
            dim.width = Math.max(dim.width, itemSize.width);
            dim.height += itemSize.height;
        }
        return dim;
    }
    else
        return drawLayout(canvas, root, x, y, inactiveInherited);
}

function draw() {
    configHistory.push({
        "config": JSON.parse(JSON.stringify(config))
    });

    var canvas = document.createElement('svg');
    size = drawRecursive(canvas, config, 0, 0, false);

    // Draw Border
    canvas.appendChild(getLine(0, 0, size.width, 0));
    canvas.appendChild(getLine(size.width, 0, size.width, size.height + LINESIZE));
    canvas.appendChild(getLine(size.width, size.height + LINESIZE, 0, size.height + LINESIZE));
    canvas.appendChild(getLine(0, size.height + LINESIZE, 0, 0));

    canvasWidth = size.width;
    canvasHeight = size.height;

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', canvasWidth);
    outputSvg.setAttribute('height', canvasHeight + LINESIZE);

    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)

    // Display
    displaySvg.setAttribute('width', canvasWidth * zoomFactor);
    displaySvg.setAttribute('height', canvasHeight * zoomFactor + LINESIZE);
}