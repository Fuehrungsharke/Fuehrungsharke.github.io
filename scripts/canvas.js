var Layout = {
    ListRight: "list-right",
    ListRightBelow: "list-right-below",
    RowRight: "row-right",
    RowRightBelow: "row-right-below",
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
    var signDimensions = [0, 0];
    var uuid = createUUID();
    root.uuid = uuid;
    if (root.sign != null) {
        var itemBox = getSignSvg(root, uuid, x, y, inactiveInherited);
        signDimensions = [256, 256];
        if (root.show_staff) {
            var staff = getStaff(root);
            var staffText = document.createElement('text');
            staffText.innerHTML = `${staff[0]} / ${staff[1]} / ${staff[2]} / <tspan>${staff[3]}</tspan>`;
            staffText.classList.add('staff');
            staffText.setAttribute('x', signDimensions[0] / 2);
            staffText.setAttribute('y', signDimensions[1]);
            staffText.setAttribute('font-size', 22);
            staffText.setAttribute('font-family', 'Verdana');
            staffText.setAttribute('text-anchor', 'middle');
            itemBox.appendChild(staffText);
            signDimensions[1] += 32;
        }
        if (root.name != null) {
            var nameParts = root['name'].split(', ');
            for (let namePart in nameParts) {
                itemBox.appendChild(getText(uuid, nameParts[namePart], signDimensions[0] / 2, signDimensions[1]));
                signDimensions[1] += 24;
            }
        }
        canvas.appendChild(itemBox);
    }
    return signDimensions;
}

function drawWithHorizontally(canvas, root, x, y, inactiveInherited) {
    var dim = [0, 0];
    if (root.with == null || !Array.isArray(root.with) || root.with.length <= 0)
        return dim;
    root.with.forEach(item => {
        var signDim = drawSign(canvas, item, x + dim[0], y, root.inactive || inactiveInherited);
        dim[0] += signDim[0];
        dim[1] = Math.max(dim[1], signDim[1]);
    });
    return dim;
}

function drawListRight(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    usedWidth += dimSign[0];
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign[0], y, inactiveInherited);
    usedWidth += dimWith[0];
    var maxWithHeight = dimWith[1];

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        var signHeight = 256
        appendLine(canvas, root, inactiveInherited, x + usedWidth, y + signHeight / 2, x + usedWidth + GAP, y + signHeight / 2);
        usedWidth += GAP;
        var prevSubHeight = null;
        var lastSubY = usedHeight;
        for (let subTree in subTrees) {
            lastSubY = usedHeight;
            appendLine(canvas, root, inactiveInherited, x + usedWidth, y + usedHeight + signHeight / 2, x + usedWidth + GAP, y + usedHeight + signHeight / 2);
            var subSize = drawRecursive(canvas, subTrees[subTree], x + usedWidth + GAP, y + usedHeight, root.inactive || inactiveInherited);
            subTotalWidth = Math.max(subTotalWidth, subSize[0]);
            if (prevSubHeight == null)
                usedHeight += Math.max(dimSign[1], subSize[1]);
            else
                usedHeight += subSize[1];
            prevSubHeight = subSize[1];
        }
        appendLine(canvas, root, inactiveInherited, x + usedWidth, y + signHeight / 2, x + usedWidth, y + lastSubY + signHeight / 2);
        usedWidth += GAP;
        usedWidth += subTotalWidth;
    }
    else
        usedHeight += Math.max(dimSign[1], maxWithHeight);
    return [usedWidth, usedHeight];
}

function drawListRightBelow(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    usedWidth += dimSign[0];
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign[0], y, inactiveInherited);
    usedHeight += Math.max(dimSign[1], dimWith[1]);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var subTrees = root.sub;
        var subTotalWidth = 0;
        if (subTrees.length > 0) {
            var signHeight = 256
            var lastSubY = usedHeight;
            for (let subTree in subTrees) {
                lastSubY = usedHeight;
                appendLine(canvas, root, inactiveInherited, x + dimSign[0] / 2, y + usedHeight + signHeight / 2, x + usedWidth, y + usedHeight + signHeight / 2);
                var subSize = drawRecursive(canvas, subTrees[subTree], x + usedWidth + GAP, y + usedHeight, root.inactive || inactiveInherited);
                subTotalWidth = Math.max(subTotalWidth, subSize[0]);
                usedHeight += subSize[1];
            }
            appendLine(canvas, root, inactiveInherited, x + dimSign[0] / 2, y + dimSign[1], x + dimSign[0] / 2, y + lastSubY + signHeight / 2);
            usedWidth += GAP;
        }
        usedWidth += Math.max(dimWith[0], subTotalWidth);
    }
    else
        usedWidth += dimWith[0];
    return [usedWidth, usedHeight];
}

function drawRowRight(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    usedWidth += dimSign[0];
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign[0], y, inactiveInherited);
    usedWidth += dimWith[0];

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var signHeight = 256

        appendLine(canvas, root, inactiveInherited, x + usedWidth, y + signHeight / 2, x + usedWidth + 2 * GAP, y + signHeight / 2);
        usedWidth += 2 * GAP;

        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = dimSign[1];
        var leafRowWidth = 0;
        var leafFirstRowWidth = 0;
        var leafGap = 0;
        var cntLeafs = 0;
        var leafs = root.sub;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + usedWidth + leafGap + leafRowWidth, y + usedHeight, root.inactive || inactiveInherited);
            leafRowWidth += leafDimensions[0];
            leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
            leafsTotalRowHeight = Math.max(leafsTotalRowHeight, leafDimensions[1]);
            var breakAt = 4
            if (cntLeafs % breakAt == 0 && leafs.length > cntLeafs + 1) {
                usedHeight += leafsTotalRowHeight;
                if (leafFirstRowWidth == 0)
                    leafFirstRowWidth = leafRowWidth
                leafRowWidth = leafFirstRowWidth / (2 * breakAt);
                leafsTotalRowHeight = 0;
            }
        }
        usedHeight += leafsTotalRowHeight;
        usedWidth += leafsTotalWidth;
    }
    else
        usedHeight += Math.max(dimSign[1], dimWith[1]);
    return [usedWidth, usedHeight];
}

function drawRowRightBelow(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;
    var dimSign = drawSign(canvas, root, x, y, inactiveInherited);
    usedWidth += dimSign[0];
    if (root.sign == 'Collapsed')
        return dimSign;

    var dimWith = drawWithHorizontally(canvas, root, x + dimSign[0], y, inactiveInherited);
    usedHeight += Math.max(dimSign[1], dimWith[1]);

    if (root.sub != null && Array.isArray(root.sub) && root.sub.length > 0) {
        var signHeight = 256

        var leafsTotalWidth = 0;
        var leafsTotalRowHeight = dimSign[1];
        var leafRowWidth = 0;
        var leafFirstRowWidth = 0;
        var leafGap = 0;
        var cntLeafs = 0;

        appendLine(canvas, root, inactiveInherited, x + dimSign[0] / 2, y + dimSign[1], x + dimSign[0] / 2, y + usedHeight + signHeight / 2);
        appendLine(canvas, root, inactiveInherited, x + dimSign[0] / 2, y + usedHeight + signHeight / 2, x + usedWidth, y + usedHeight + signHeight / 2);

        var leafs = root.sub;
        for (let leaf in leafs) {
            cntLeafs += 1;
            var leafDimensions = drawRecursive(canvas, leafs[leaf], x + usedWidth + leafGap + leafRowWidth, y + usedHeight, root.inactive || inactiveInherited);
            leafRowWidth += leafDimensions[0];
            leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
            leafsTotalRowHeight = Math.max(leafsTotalRowHeight, leafDimensions[1]);
            var breakAt = 4
            if (cntLeafs % breakAt == 0 && leafs.length > cntLeafs + 1) {
                usedHeight += leafsTotalRowHeight;
                if (leafFirstRowWidth == 0)
                    leafFirstRowWidth = leafRowWidth
                leafRowWidth = leafFirstRowWidth / (2 * breakAt);
                leafsTotalRowHeight = 0;
            }
        }
        usedHeight += leafsTotalRowHeight;
        usedWidth += Math.max(dimWith[0], leafsTotalWidth);
    }
    else
        usedWidth += dimWith[0];
    return [usedWidth, usedHeight];
}

function drawLayout(canvas, root, x, y, inactiveInherited) {
    switch (root.layout) {
        case Layout.ListRightBelow:
            return drawListRightBelow(canvas, root, x, y, inactiveInherited);
        case Layout.RowRight:
            return drawRowRight(canvas, root, x, y, inactiveInherited);
        case Layout.RowRightBelow:
            return drawRowRightBelow(canvas, root, x, y, inactiveInherited);
        case Layout.ListRight:
        default:
            return drawListRight(canvas, root, x, y, inactiveInherited);
    }
}

function drawRecursive(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;

    if (Array.isArray(root) && root.length > 0) {
        for (let idx in root) {
            var itemSize = drawLayout(canvas, root[idx], x, y + usedHeight, inactiveInherited);
            usedWidth = Math.max(usedWidth, itemSize[0]);
            usedHeight += itemSize[1];
        }
        return [usedWidth, usedHeight];
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
    canvas.appendChild(getLine(0, 0, size[0], 0));
    canvas.appendChild(getLine(size[0], 0, size[0], size[1] + LINESIZE));
    canvas.appendChild(getLine(size[0], size[1] + LINESIZE, 0, size[1] + LINESIZE));
    canvas.appendChild(getLine(0, size[1] + LINESIZE, 0, 0));

    canvasWidth = size[0];
    canvasHeight = size[1];

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', canvasWidth);
    outputSvg.setAttribute('height', canvasHeight + LINESIZE);

    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)

    // Display
    displaySvg.setAttribute('width', canvasWidth * zoomFactor);
    displaySvg.setAttribute('height', canvasHeight * zoomFactor + LINESIZE);
}