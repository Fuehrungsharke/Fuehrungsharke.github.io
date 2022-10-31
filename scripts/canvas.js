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
    var uuid = createUUID();
    root['uuid'] = uuid;
    if (root.hasOwnProperty('sign')) {
        var itemBox = getSignSvg(root, uuid, x, y, inactiveInherited);
        if (root.hasOwnProperty('name')) {
            var offset = -32;
            var nameParts = root['name'].split(', ');
            for (let namePart in nameParts) {
                itemBox.appendChild(getText(uuid, nameParts[namePart], signWidth / 2, signHeight + offset));
                offset += 24;
            }
        }
        if (root.show_staff) {
            var staff = getStaff(root);
            var staffText = document.createElement('text');
            staffText.innerHTML = `${staff[0]} / ${staff[1]} / ${staff[2]} / <tspan>${staff[3]}</tspan>`;
            staffText.classList.add('staff');
            staffText.setAttribute('x', signWidth / 2);
            staffText.setAttribute('y', signHeight - 32);
            staffText.setAttribute('font-size', 22);
            staffText.setAttribute('font-family', 'Verdana');
            staffText.setAttribute('text-anchor', 'middle');
            itemBox.appendChild(staffText);
        }
        canvas.appendChild(itemBox);
    }
}

function drawItem(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;

    drawSign(canvas, root, x, y, inactiveInherited);
    usedWidth += signWidth;

    if (root.sign == 'Collapsed') {
        usedHeight += signHeight;
        return [usedWidth, usedHeight];
    }

    // With
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH])) {
        root[WITH].forEach(item => {
            drawSign(canvas, item, x + usedWidth, y, root.inactive || inactiveInherited);
            usedWidth += signWidth;
        });
    }

    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]) && root[SUB].length > 0) {
        var hasSubTrees = root[SUB].some(item =>
            (item.hasOwnProperty(SUB) && Array.isArray(item[SUB]) && item[SUB].length > 0)
            || (item.hasOwnProperty(WITH) && Array.isArray(item[WITH]) && item[WITH].length > 0)
        );
        if (!hasSubTrees) {
            // Leafs
            var leafs = root[SUB];
            var leafsTotalWidth = 0;
            var leafRowWidth = 0;
            var leafGap = 0;
            if (leafs.length > 0) {
                var cntLeafs = 0;
                for (let leaf in leafs) {
                    cntLeafs += 1;
                    drawRecursive(canvas, leafs[leaf], x + usedWidth + leafGap + leafRowWidth, y + usedHeight, root.inactive || inactiveInherited);
                    leafRowWidth += signWidth;
                    leafsTotalWidth = Math.max(leafsTotalWidth, leafRowWidth);
                    if (leafRowWidth % (signWidth * 4) == 0 && leafs.length > cntLeafs + 1) {
                        leafRowWidth = 0;
                        usedHeight += signHeight;
                    }
                }
                usedHeight += signHeight;
            }
            usedWidth += leafsTotalWidth;
        }
        else {
            // SubTrees
            var subTrees = root[SUB];
            var subTotalWidth = 0;
            if (subTrees.length > 0) {
                var line = getLine(x + usedWidth, y + signHeight / 2, x + usedWidth + GAP, y + signHeight / 2);
                if (root.inactive || inactiveInherited)
                    line.setAttribute('opacity', 0.25);
                canvas.appendChild(line);
                usedWidth += GAP;
                var lastSubY = usedHeight;
                for (let subTree in subTrees) {
                    lastSubY = usedHeight;
                    line = getLine(x + usedWidth, y + usedHeight + signHeight / 2, x + usedWidth + GAP, y + usedHeight + signHeight / 2);
                    if (root.inactive || inactiveInherited)
                        line.setAttribute('opacity', 0.25);
                    canvas.appendChild(line);
                    var subSize = drawRecursive(canvas, subTrees[subTree], x + usedWidth + GAP, y + usedHeight, root.inactive || inactiveInherited);
                    subTotalWidth = Math.max(subTotalWidth, subSize[0]);
                    usedHeight += subSize[1];
                }
                line = getLine(x + usedWidth, y + signHeight / 2, x + usedWidth, y + lastSubY + signHeight / 2);
                if (root.inactive || inactiveInherited)
                    line.setAttribute('opacity', 0.25);
                canvas.appendChild(line);
                usedWidth += GAP;
            }
            usedWidth += subTotalWidth;
        }
    }
    else
        usedHeight += signHeight;
    return [usedWidth, usedHeight];
}

function drawRecursive(canvas, root, x, y, inactiveInherited) {
    var usedWidth = 0;
    var usedHeight = 0;

    if (Array.isArray(root) && root.length > 0) {
        for (let idx in root) {
            var itemSize = drawItem(canvas, root[idx], x, y + usedHeight, inactiveInherited);
            usedWidth = Math.max(usedWidth, itemSize[0]);
            usedHeight += itemSize[1];
        }
        return [usedWidth, usedHeight];
    }
    else
        return drawItem(canvas, root, x, y, inactiveInherited);
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