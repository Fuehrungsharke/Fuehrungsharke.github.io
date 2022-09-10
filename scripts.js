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

var ZTr = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "troop": true,
    "ofplatoon": true,
    "with": [
        {
            "name": "Der Zugtruppführer",
            "sign": "Person",
            "txt": "TZ",
            "leading": true,
            "troop": true,
            "ofplatoon": true,
        }
    ],
    "sub": [
        {
            "name": "ZTr-Helfer 1",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 2",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 3",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 4",
            "sign": "Person",
            "txt": "ZTr",
        }
    ]
};

var BGr = {
    "sign": "Unit",
    "txt": "B",
    "org": "THW",
    "group": true,
    "with": [
        {
            "txt": "B",
            "name": "Der Gruppenführer, der Bergung",
            "sign": "Person",
            "leading": true,
            "group": true,
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Bergung",
            "sign": "Person",
            "txt": "B",
            "leading": true,
            "troop": true,
            "sub": null,
        },
        {
            "name": "B-Helfer 1",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 2",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 3",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 4",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 5",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 6",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 7",
            "sign": "Person",
            "txt": "B",
        },
    ]
};

var FGrN = {
    "sign": "Unit",
    "txt": "N",
    "org": "THW",
    "group": true,
    "with": [
        {
            "name": "Der Gruppenführer, der Notversorgung, und Notinstandsetzung",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "group": true,
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Notversorgung, und Notinstandsetzung",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "troop": true,
        },
        {
            "name": "N-Helfer 1",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 2",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 3",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 4",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 5",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 6",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 7",
            "sign": "Person",
            "txt": "N",
        },
    ]
};

var TZ = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "with": [
        {
            "sign": "Person",
            "name": "Der Zugführer",
            "txt": "TZ",
            "leading": true,
            "platoon": true,
        }
    ],
    "sub": [
        ZTr,
        BGr,
        FGrN,
    ],
};

var config = TZ;

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

function openSignContextMenu(evt, sign) {
    var root = getConfigElementByUuid(config, sign.getAttributeNS(null, 'uuid'));
    var svg = getResource(`/signs/${root['sign']}.svg`);
    var menuItems = [];
    while (match = /\{\{(\w+)/.exec(svg)) {
        var menuItem = document.createElement('li');
        menuItem.classList.add('context-menu-item');
        menuItem.innerHTML = match[1].substring(2);
        menuItems.push(menuItem);
    }
    var menu = document.querySelector('.context-menu');
    menu.replaceChildren(menuItems);

    var touchpos = getEvtPos(evt);
    menu.style.left = touchpos.clientX + "px";
    menu.style.top = touchpos.clientY + "px";
    menu.classList.add('context-menu-active');
}

function closeSignContextMenu() {
    var menu = document.querySelector('.context-menu');
    menu.classList.remove('context-menu-active');
}

function onDomContentLoaded() {
    iptConfig.addEventListener('change', configSelected, false);
    outputSvg.addEventListener('pointerdown', drag);
    outputSvg.addEventListener('pointermove', dragging);
    outputSvg.addEventListener('pointerup', drop);
    outputSvg.addEventListener('pointercancel', drop);
}

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
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

function download(content, type, filename) {
    var dataStr = `data:${type};charset=utf-8,` + encodeURIComponent(content);
    var downloadJsonAnchorNode = document.createElement('a');
    downloadJsonAnchorNode.setAttribute("href", dataStr);
    downloadJsonAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadJsonAnchorNode);
    downloadJsonAnchorNode.click();
    downloadJsonAnchorNode.remove();
}

function removeUuid(root) {
    if (typeof root != 'object')
        return root;
    if (Array.isArray(root))
        return root.map(item => removeUuid(item));
    var newObj = {};
    for (var key in root) {
        if (key == 'uuid')
            continue;
        newObj[key] = removeUuid(root[key]);
    }
    return newObj;
}

document.getElementById('btnDownloadConfig').onclick = function () {
    download(JSON.stringify(removeUuid(config), null, 2), 'text/json', 'FüHarke.json');
}

document.getElementById('btnDownloadSvg').onclick = function () {
    download(outputSvg.outerHTML, 'image/svg', 'FüHarke.svg');
}

function drag(evt) {
    var element = evt.target;
    if (element.nodeName == 'text' && element.getAttributeNS(null, 'uuid') != null)
        return;
    while (element != null && !element.classList.contains('draggable') && element.id != 'outputSvg') {
        element = element.parentElement;
    }
    if (element == null || !element.classList.contains('draggable'))
        return;
    draggingElement = element;

    var canvas = draggingElement.parentElement;
    var canvasChildren = Array.from(canvas.childNodes).filter(item => item != draggingElement);
    canvasChildren.unshift(draggingElement);
    canvas.childNodes = canvasChildren;

    var touchpos = getEvtPos(evt);
    var transform = draggingElement.getAttributeNS(null, 'transform');
    var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);
    if (match == null) {
        draggingElement = null;
        return;
    }
    draggingElement.draggingInfo = {
        offsetX: match[1] - touchpos.clientX,
        offsetY: match[2] - touchpos.clientY,
        scaleX: match[3],
        scaleY: match[4],
        uuid: draggingElement.getAttributeNS(null, 'uuid'),
    };
}

function dragging(evt) {
    if (draggingElement) {
        evt.preventDefault();
        var touchpos = getEvtPos(evt);
        draggingElement.setAttributeNS(null, 'transform', `translate(${touchpos.clientX + draggingElement.draggingInfo.offsetX}, ${touchpos.clientY + draggingElement.draggingInfo.offsetY}) scale(${draggingElement.draggingInfo.scaleX} ${draggingElement.draggingInfo.scaleY})`);
    }
}

function drop(evt) {
    var draggedElement = draggingElement;
    draggingElement = null;
    if (hoveringUuid != null) {
        var source = getConfigElementParentByUuid(config, draggedElement.draggingInfo.uuid);
        var subject = getConfigElementByUuid(config, draggedElement.draggingInfo.uuid);
        var target = getConfigElementByUuid(config, hoveringUuid);

        if (subject == target || isAncestorOf(target, subject))
            return;

        if (target != null && source != null) {
            source.sub = source.sub.filter(item => item != subject);
            if (target.sub == null)
                target.sub = [subject];
            else
                target.sub.push(subject);
        }
    }
    if (draggedElement)
        draw();
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
            .replaceAll(`{{${key.toUpperCase()}}}`, root[key])
            .replaceAll(`{{${key.toUpperCase()}`, '')
            .replaceAll(`${key.toUpperCase()}}}`, '');

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
        console.log(menuItem);
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