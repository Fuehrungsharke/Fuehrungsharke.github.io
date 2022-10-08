function getSign(root) {
    var svg = getResource(`/signs/${root['sign']}.svg`);
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

function getSignSvg(root, uuid, x, y) {
    var signSvg = document.createElement('g');
    signSvg.setAttribute('transform', `translate(${x}, ${y}) scale(1 1)`)
    signSvg.setAttribute('uuid', uuid);
    signSvg.classList.add('draggable');
    signSvg.classList.add('editable');

    signSvg.innerHTML = getSign(root);
    signSvg.childNodes[0].setAttribute('touch-action', 'none');
    signSvg.childNodes[0].setAttribute('onpointerover', `pointerOverSvg('${uuid}')`);
    signSvg.childNodes[0].setAttribute('onpointerout', `pointerOutSvg('${uuid}')`);
    return signSvg;
}

function getLine(ax, ay, bx, by) {
    var line = document.createElement('path');
    line.setAttribute('stroke-width', 3);
    line.setAttribute('stroke', 'black');
    line.setAttribute('d', `M${ax} ${ay} L${bx} ${by}`);
    return line;
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

function drawSign(canvas, root, x, y) {
    var uuid = createUUID();
    root['uuid'] = uuid;
    if (root.hasOwnProperty('sign')) {
        var itemBox = getSignSvg(root, uuid, x, y);
        if (root.hasOwnProperty('name')) {
            var offset = -32;
            var nameParts = root['name'].split(', ');
            for (let namePart in nameParts) {
                itemBox.appendChild(getText(uuid, nameParts[namePart], signWidth / 2, signHeight + offset));
                offset += 24;
            }
        }
        canvas.appendChild(itemBox);
    }
}

function drawItem(canvas, root, x, y) {
    var usedWidth = 0;
    var usedHeight = 0;

    drawSign(canvas, root, x, y);
    usedWidth += signWidth;

    // With
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH])) {
        root[WITH].forEach(item => {
            drawSign(canvas, item, x + usedWidth, y);
            usedWidth += signWidth;
        });
    }

    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]) && root[SUB].length > 0) {
        var leafs = root[SUB].filter(item =>
            (!item.hasOwnProperty(SUB) || !Array.isArray(item[SUB]) || !item[SUB].length)
            && (!item.hasOwnProperty(WITH) || !Array.isArray(item[WITH]) || !item[WITH].length)
        );
        var subTrees = root[SUB].filter(item =>
            (item.hasOwnProperty(SUB) && Array.isArray(item[SUB]) && item[SUB].length > 0)
            || (item.hasOwnProperty(WITH) && Array.isArray(item[WITH]) && item[WITH].length > 0)
        );

        // Leafs
        var leafsTotalWidth = 0;
        var leafRowWidth = 0;
        var leafGap = 0;
        if (subTrees.length > 0)
            leafGap = 2 * GAP;
        if (leafs.length > 0) {
            var cntLeafs = 0;
            for (let leaf in leafs) {
                cntLeafs += 1;
                drawRecursive(canvas, leafs[leaf], x + usedWidth + leafGap + leafRowWidth, y + usedHeight);
                leafRowWidth += signWidth;
                leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
                if (leafRowWidth % (signWidth * 4) == 0 && leafs.length > cntLeafs + 1) {
                    leafRowWidth = 0;
                    usedHeight += signHeight;
                }
            }
            usedHeight += signHeight;
        }

        // SubTrees
        var subTotalWidth = 0;
        if (subTrees.length > 0) {
            canvas.appendChild(getLine(x + usedWidth, y + signHeight / 2, x + usedWidth + GAP, y + signHeight / 2));
            usedWidth += GAP;
            var lastSubY = usedHeight;
            for (let subTree in subTrees) {
                lastSubY = usedHeight;
                canvas.appendChild(getLine(x + usedWidth, y + usedHeight + signHeight / 2, x + usedWidth + GAP, y + usedHeight + signHeight / 2));
                var subSize = drawRecursive(canvas, subTrees[subTree], x + usedWidth + GAP, y + usedHeight);
                subTotalWidth = Math.max(subTotalWidth, subSize[0]);
                usedHeight += subSize[1];
            }
            canvas.appendChild(getLine(x + usedWidth, y + signHeight / 2, x + usedWidth, y + lastSubY + signHeight / 2));
            usedWidth += GAP;
        }

        usedWidth += Math.max(leafsTotalWidth, subTotalWidth);
    }
    else
        usedHeight += signHeight;
    return [usedWidth, usedHeight];
}

function drawRecursive(canvas, root, x, y) {
    var usedWidth = 0;
    var usedHeight = 0;

    if (Array.isArray(root) && root.length > 0) {
        for (let idx in root) {
            var itemSize = drawItem(canvas, root[idx], x, y + usedHeight);
            usedWidth = Math.max(usedWidth, itemSize[0]);
            usedHeight += itemSize[1];
        }
        return [usedWidth, usedHeight];
    }
    else
        return drawItem(canvas, root, x, y);
}

function draw() {
    var canvas = document.createElement('svg');
    size = drawRecursive(canvas, config, 0, 0, 0);

    // Draw Border
    canvas.appendChild(getLine(0, 0, size[0], 0));
    canvas.appendChild(getLine(size[0], 0, size[0], size[1] + LINESIZE));
    canvas.appendChild(getLine(size[0], size[1] + LINESIZE, 0, size[1] + LINESIZE));
    canvas.appendChild(getLine(0, size[1] + LINESIZE, 0, 0));

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', size[0]);
    outputSvg.setAttribute('height', size[1] + LINESIZE);
}