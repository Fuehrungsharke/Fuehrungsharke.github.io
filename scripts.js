const maxColumns = 10
const subColumns = 5
const signWidth = 256
const signHeight = 256
const GAP = 50
const LINESIZE = 26

const WITH = 'with';
const SUB = 'sub';

var draggingElement = null;
var hoveringUuid = null;

var KeyCode = {
    ESC: 27,
}

iptConfig = document.getElementById('iptConfig');
outputSvg = document.getElementById("outputSvg");

function getEvtPos(evt) {
    var touchpos = evt;
    if (touchpos.clientX == undefined)
        touchpos = evt.targetTouches[0];
    return touchpos;
}

function getClickedElement(evt, className) {
    var evtElement = evt.srcElement || evt.target;
    if (evtElement.classList.contains(className))
        return evtElement;
    else
        while (evtElement = evtElement.parentNode)
            if (evtElement.classList && evtElement.classList.contains(className))
                return evtElement;
    return false;
}

function onDomContentLoaded() {
    iptConfig.addEventListener('change', configSelected, false);
    outputSvg.addEventListener('pointerdown', drag);
    outputSvg.addEventListener('pointermove', dragging);
    outputSvg.addEventListener('pointerup', drop);
    outputSvg.addEventListener('pointercancel', drop);
}

function configSelected(evt) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        var preamble = 'data:application/json;base64,';
        if (data.startsWith(preamble))
            data = data.substring(preamble.length);
        var ab = b64DecodeUnicode(data);
        config = JSON.parse(ab);
        draw();
    }
    reader.readAsDataURL(evt.target.files[0]);
}

document.getElementById('btnDownloadConfig').onclick = function () {
    download(JSON.stringify(removeUuid(config), null, 2), 'text/json', 'FüHarke.json');
}

document.getElementById('btnDownloadSvg').onclick = function () {
    download(outputSvg.outerHTML, 'image/svg', 'FüHarke.svg');
}

function isAncestorOf(item, presumedDescendant) {
    if (presumedDescendant.hasOwnProperty(SUB) && Array.isArray(presumedDescendant[SUB])) {
        for (let idx in presumedDescendant[SUB]) {
            if (presumedDescendant[SUB][idx] == item)
                return true;
            var subResult = isAncestorOf(item, presumedDescendant[SUB][idx]);
            if (subResult)
                return subResult;
        }
    }
    return false;
}

function getConfigElementByUuid(root, uuid) {
    if (root.hasOwnProperty('uuid') && root['uuid'] == uuid) {
        return root;
    }
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB])) {
        for (let idx in root[SUB]) {
            var subResult = getConfigElementByUuid(root[SUB][idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    }
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH])) {
        for (let idx in root[WITH]) {
            var subResult = getConfigElementByUuid(root[WITH][idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    }
    return null;
}

function getConfigElementParentByUuid(root, uuid) {
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB])) {
        for (let idx in root[SUB]) {
            if (root[SUB][idx].hasOwnProperty('uuid') && root[SUB][idx]['uuid'] == uuid) {
                return root;
            }
            var subResult = getConfigElementParentByUuid(root[SUB][idx], uuid);
            if (subResult != null)
                return subResult;
        }
    }
    return null;
}

function editName(uuid) {
    var item = getConfigElementByUuid(config, uuid);
    let newName = prompt('Edit Name:', item['name']);
    if (newName == undefined)
        return;
    item['name'] = newName;
    draw();
}

function pointerOverSvg(uuid) {
    hoveringUuid = uuid;
    console.log('over: ' + hoveringUuid);
}

function pointerOutSvg(uuid) {
    if (hoveringUuid == uuid) {
        hoveringUuid = null;
        console.log('out: ' + uuid);
    }
}

function getResource(path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();
    return req.responseText;
}

function getSign(root) {
    var svg = getResource(`/signs/${root['sign']}.svg`);
    for (var key in root)
        svg = svg
            .replaceAll(`{{${key}}}`, root[key])
            .replaceAll(`{{${key}`, '')
            .replaceAll(`${key}}}`, '');

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

    if (!root.hasOwnProperty('fillcolor'))
        root['fillcolor'] = '#003399';

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

function drawRecursive(canvas, root, x, y) {
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

    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB])) {
        var leafs = root[SUB].filter(item => !item.hasOwnProperty(SUB) || !Array.isArray(item[SUB]) || !item[SUB].length);
        var subTrees = root[SUB].filter(item => item.hasOwnProperty(SUB) && Array.isArray(item[SUB]) && item[SUB].length > 0);

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

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
document.addEventListener('click', function (evt) {
    var menuItem = getClickedElement(evt, 'context-menu-item');
    if (menuItem) {
        evt.preventDefault();
        clickContextMenuItem(menuItem);
    }
    closeSignContextMenu();
});
document.addEventListener('contextmenu', function (evt) {
    var sign = getClickedElement(evt, 'editable');
    if (sign) {
        evt.preventDefault();
        openSignContextMenu(evt, sign);
    }
    else if (getClickedElement(evt, 'noContextMenu'))
        evt.preventDefault();
});

window.onkeyup = function (e) {
    if (e.keyCode === KeyCode.ESC)
        closeSignContextMenu();
}

draw();