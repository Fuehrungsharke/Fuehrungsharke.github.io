var Layout = {
    ListRight: "list-right",
    ListRightBelow: "list-right-below",
    RowRight: "row-right",
    RowRightBelow: "row-right-below",
    CenteredBelow: "row-center-below",
}

Dim.prototype.width = 0;
Dim.prototype.height = 0;
Dim.prototype.anchorX = 0;
Dim.prototype.anchorY = 0;

function Dim(width, height, anchorX, anchorY) {
    if (width != null)
        this.width = width;
    if (height != null)
        this.height = height;
    if (anchorX != null)
        this.anchorX = anchorX;
    if (anchorY != null)
        this.anchorY = anchorY;
}

function getSign(root) {
    var svg = null;
    if (root.sign == null)
        return null;
    if (root.sign.includes('/'))
        svg = getResource(root.sign);
    else
        svg = getResource(`/signs/${root.sign}.svg`);

    var matches = /\{\{([\w]+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
    while (matches != null && matches.length == 4) {
        if (matches[1] in root)
            svg = svg.replace(matches[0], matches[2]);
        else
            svg = svg.replace(matches[0], matches[3]);
        matches = /\{\{([\w]+)\?([\w\d]+)\:([\w\d]+)\}\}/g.exec(svg);
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
    signSvg.setAttribute('transform', `translate(${x}, ${y}) scale(1 1)`)
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

function appendLine(canvas, root, inactiveInherited, ax, ay, bx, by) {
    var line = getLine(ax, ay, bx, by);
    if (root.inactive || inactiveInherited)
        line.setAttribute('opacity', 0.25);
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
    var dimSign = new Dim();
    if (root == null)
        return dimSign;
    var uuid = createUUID();
    root.uuid = uuid;
    if (root.sign != null) {
        var itemBox = getSignSvg(root, uuid, x, y, inactiveInherited);
        dimSign.width = 256;
        dimSign.height = 256;
        dimSign.anchorX = 128;
        dimSign.anchorY = 128;
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
        if (canvas != null)
            canvas.appendChild(itemBox);
    }
    return dimSign;
}

function drawWithHorizontally(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim();
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
    var dim = new Dim();
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        var signHeight = 256
        dim.width += GAP;
        appendLine(canvas, root, inactiveInherited, x + dim.width, y + signHeight / 2, x + dim.width + GAP, y + signHeight / 2);
        dim.width += GAP;
        var prevSubHeight = null;
        var lastSubY = dim.height;
        for (let subTree in subTrees) {
            lastSubY = dim.height;
            appendLine(canvas, root, inactiveInherited, x + dim.width, y + dim.height + signHeight / 2, x + dim.width + GAP, y + dim.height + signHeight / 2);
            var subSize = drawRecursive(canvas, subTrees[subTree], x + dim.width + 2 * GAP, y + dim.height, root.inactive || inactiveInherited);
            subTotalWidth = Math.max(subTotalWidth, subSize.width + GAP);
            if (prevSubHeight == null)
                dim.height += Math.max(dimSign.height, dimWith.height, subSize.height);
            else
                dim.height += subSize.height;
            prevSubHeight = subSize.height;
        }
        appendLine(canvas, root, inactiveInherited, x + dim.width, y + signHeight / 2, x + dim.width, y + lastSubY + signHeight / 2);
        dim.width += GAP;
        dim.width += subTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);
    return dim;
}

function drawListRightBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim();
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.height += Math.max(dimSign.height, dimWith.height);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        if (subTrees.length > 0) {
            var signHeight = 256
            var lastSubY = dim.height;
            for (let subTree in subTrees) {
                lastSubY = dim.height;
                appendLine(canvas, root, inactiveInherited, x + dimSign.width / 2, y + dim.height + signHeight / 2, x + dim.width - GAP, y + dim.height + signHeight / 2);
                var subSize = drawRecursive(canvas, subTrees[subTree], x + dim.width, y + dim.height, root.inactive || inactiveInherited);
                subTotalWidth = Math.max(subTotalWidth, subSize.width);
                dim.height += subSize.height;
            }
            appendLine(canvas, root, inactiveInherited, x + dimSign.width / 2, y + dimSign.height, x + dimSign.height / 2, y + lastSubY + signHeight / 2);
            dim.width += GAP;
        }
        dim.width += Math.max(dimWith.width, subTotalWidth);
    }
    else
        dim.width += dimWith.width;
    return dim;
}

function drawRowRight(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim();
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.width += dimWith.width;

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var signHeight = 256

        dim.width += GAP;
        appendLine(canvas, root, inactiveInherited, x + dim.width, y + signHeight / 2, x + dim.width + 2 * GAP, y + signHeight / 2);
        dim.width += 3 * GAP;

        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = Math.max(dimSign.height, dimWith.height);
        var leafRowWidth = 0;
        var leafGap = 0;
        var cntLeafs = 0;
        var leafs = root.sub;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + dim.width + leafGap + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
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
        dim.width += leafsTotalWidth;
    }
    else
        dim.height += Math.max(dimSign.height, dimWith.height);
    return dim;
}

function drawRowRightBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim();
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    dim.width += dimSign.width;
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign.width, y, inactiveInherited);
    dim.height += Math.max(dimSign.height, dimWith.height);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var signHeight = 256

        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = dimSign.height;
        var leafRowWidth = 0;
        var leafGap = 0;
        var cntLeafs = 0;

        appendLine(canvas, root, inactiveInherited, x + dimSign.width / 2, y + dimSign.height, x + dimSign.width / 2, y + dim.height + signHeight / 2);
        appendLine(canvas, root, inactiveInherited, x + dimSign.width / 2, y + dim.height + signHeight / 2, x + dim.width - GAP, y + dim.height + signHeight / 2);

        var leafs = root.sub;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + dim.width + leafGap + leafRowWidth, y + dim.height, root.inactive || inactiveInherited);
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
        dim.width += Math.max(dimWith.width, leafsTotalWidth);
    }
    else
        dim.width += dimWith.width;
    return dim;
}

function drawCenteredBelow(canvas, root, x, y, inactiveInherited) {
    var dim = new Dim();
    var signWidth = 256;
    var dimSign = drawSign(null, root, 0, 0, false); // just measure dimensions
    var dimWith = drawWithHorizontally(null, root, 0, 0, false);
    dim.height = Math.max(dimSign.height, dimWith.height) + GAP;
    var subY = dim.height;
    var lastX = 0;
    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        root.sub.forEach(subItem => {
            appendLine(canvas, root, inactiveInherited, x + dim.width + signWidth / 2, y + subY, x + dim.width + signWidth / 2, y + subY + GAP);
            var dimSubItem = drawRecursive(canvas, subItem, x + dim.width, y + subY + GAP, root.inactive || inactiveInherited);
            lastX = x + dim.width;
            dim.width += dimSubItem.width + signWidth / 2;
            dim.height = Math.max(dim.height, subY + dimSubItem.height);
        });
        dim.width -= signWidth / 2;
        appendLine(canvas, root, inactiveInherited, x + signWidth / 2, y + subY, lastX + signWidth / 2, y + subY);
    }


    var tmpX = x + (lastX - x) / 2;
    appendLine(canvas, root, inactiveInherited, tmpX + signWidth / 2, y + subY - GAP, tmpX + signWidth / 2, y + subY);
    drawSign(canvas, root, tmpX, y, inactiveInherited);
    drawWithHorizontally(canvas, root, tmpX + dimSign.width, y, inactiveInherited);

    dim.width = Math.max(dim.width, tmpX - x + dimSign.width + dimWith.width);

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
        case Layout.CenteredBelow:
            return drawCenteredBelow(canvas, root, x, y, inactiveInherited);
        case Layout.ListRight:
        default:
            return drawListRight(canvas, root, x, y, inactiveInherited);
    }
}

function drawRecursive(canvas, root, x, y, inactiveInherited) {
    if (Array.isArray(root) && root.length > 0) {
        var dim = new Dim();
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