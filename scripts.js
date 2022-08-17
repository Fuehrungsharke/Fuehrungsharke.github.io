const maxColumns = 10
const subColumns = 5
const signWidth = 256
const signHeight = 256
const GAP = 50
const LINESIZE = 26

var draggingElement = null;
var hoveringUuid = null;

var ZTr = {
    "func": "Unit",
    "txt": "TZ",
    "org": "THW",
    "attr": "troop,ofplatoon",
    "with": [
        {
            "name": "Der Zugtruppführer",
            "func": "Person",
            "txt": "TZ",
            "attr": "troop,ofplatoon,leading",
        }
    ],
    "sub": [
        {
            "name": "ZTr-Helfer 1",
            "func": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 2",
            "func": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 3",
            "func": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 4",
            "func": "Person",
            "txt": "ZTr",
        }
    ]
};

var BGr = {
    "func": "Unit",
    "txt": "B",
    "org": "THW",
    "attr": "group",
    "with": [
        {
            "txt": "B",
            "name": "Der Gruppenführer, der Bergung",
            "func": "Person",
            "attr": "group,leading",
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Bergung",
            "func": "Person",
            "txt": "B",
            "attr": "troop,leading",
            "sub": null,
        },
        {
            "name": "B-Helfer 1",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 2",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 3",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 4",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 5",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 6",
            "func": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 7",
            "func": "Person",
            "txt": "B",
        },
    ]
};

var FGrN = {
    "func": "Unit",
    "txt": "N",
    "org": "THW",
    "attr": "group",
    "with": [
        {
            "name": "Der Gruppenführer, der Notversorgung, und Notinstandsetzung",
            "func": "Person",
            "txt": "N",
            "attr": "group,leading",
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Notversorgung, und Notinstandsetzung",
            "func": "Person",
            "txt": "N",
            "attr": "troop,leading",
        },
        {
            "name": "N-Helfer 1",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 2",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 3",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 4",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 5",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 6",
            "func": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 7",
            "func": "Person",
            "txt": "N",
        },
    ]
};

var TZ = {
    "func": "Unit",
    "txt": "TZ",
    "org": "THW",
    "attr": "platoon",
    "with": [
        {
            "func": "Person",
            "name": "Der Zugführer",
            "txt": "TZ",
            "attr": "platoon,leading",
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

document.addEventListener('DOMContentLoaded', function() {
    iptConfig.addEventListener('change', configSelected, false);
    outputSvg.addEventListener('pointerdown', drag);
    outputSvg.addEventListener('pointermove', dragging);
    outputSvg.addEventListener('pointerup', drop);
    outputSvg.addEventListener('pointercancel', drop);
});

function createUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
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
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function configSelected(evt) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var preamble = 'data:application/json;base64,';
        if(data.startsWith(preamble))
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

document.getElementById('btnDownloadConfig').onclick = function () {
    download(JSON.stringify(config, null, 2), 'text/json', 'FüHarke.json');
}

document.getElementById('btnDownloadSvg').onclick = function () {
    download(outputSvg.outerHTML, 'image/svg', 'FüHarke.svg');
}

function drag(evt) {
    var element = evt.target;
    if(element.nodeName == 'text' && element.getAttributeNS(null, 'uuid') != null)
        return;
    while(element != null && !element.classList.contains('draggable') && element.id != 'outputSvg') {
        element = element.parentElement;
    }
    if (element == null || !element.classList.contains('draggable'))
        return;
    draggingElement = element;

    var canvas = draggingElement.parentElement;
    var canvasChildren = Array.from(canvas.childNodes).filter(item => item != draggingElement);
    canvasChildren.unshift(draggingElement);
    canvas.childNodes = canvasChildren;

    var touchpos = evt;
    if(touchpos.clientX == undefined)
        touchpos = evt.targetTouches[0];

    var transform = draggingElement.getAttributeNS(null, 'transform');
    var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);
    if(match == null) {
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
        var touchpos = evt;
        if(touchpos.clientX == undefined)
            touchpos = evt.targetTouches[0];
        draggingElement.setAttributeNS(null, 'transform', `translate(${touchpos.clientX + draggingElement.draggingInfo.offsetX}, ${touchpos.clientY + draggingElement.draggingInfo.offsetY}) scale(${draggingElement.draggingInfo.scaleX} ${draggingElement.draggingInfo.scaleY})`);
    }
}

function drop(evt) {
    var draggedElement = draggingElement;
    draggingElement = null;
    if(hoveringUuid != null) {
        var source = getConfigElementParentByUuid(config, draggedElement.draggingInfo.uuid);
        var subject = getConfigElementByUuid(config, draggedElement.draggingInfo.uuid);
        var target = getConfigElementByUuid(config, hoveringUuid);

        if(subject == target || isAncestorOf(target, subject))
            return;

        if (target != null && source != null) {
            source.sub = source.sub.filter(item => item != subject);
            if (target.sub == null)
                target.sub = [ subject ];
            else
                target.sub.push(subject);
        }
    }
    if(draggedElement)
        draw();
}

function isAncestorOf(item, presumedDescendant) {
    if(presumedDescendant.hasOwnProperty('sub') && Array.isArray(presumedDescendant['sub'])){
        for(let idx in presumedDescendant['sub']) {
            if (presumedDescendant['sub'][idx] == item)
                return true;
            var subResult = isAncestorOf(item, presumedDescendant['sub'][idx]);
            if(subResult)
                return subResult;
        }
    }
    return false;
}

function getConfigElementByUuid(root, uuid) {
    if (root.hasOwnProperty('uuid') && root['uuid'] == uuid){
        return root;
    }
    if(root.hasOwnProperty('sub') && Array.isArray(root['sub'])){
        for(let idx in root['sub']) {
            var subResult = getConfigElementByUuid(root['sub'][idx], uuid);
            if(subResult != undefined)
                return subResult;
        }
    }
    return null;
}

function getConfigElementParentByUuid(root, uuid) {
    if(root.hasOwnProperty('sub') && Array.isArray(root['sub'])){
        for(let idx in root['sub']) {
            if (root['sub'][idx].hasOwnProperty('uuid') && root['sub'][idx]['uuid'] == uuid){
                return root;
            }
            var subResult = getConfigElementParentByUuid(root['sub'][idx], uuid);
            if(subResult != null)
                return subResult;
        }
    }
    return null;
}

function editName(uuid) {
    var item = getConfigElementByUuid(config, uuid);
    let newName = prompt('Edit Name:', item['name']);
    if(newName == undefined)
        return;
    item['name'] = newName;
    draw();
}

function pointerOverSvg(uuid) {
    hoveringUuid = uuid;
    console.log('over: ' + hoveringUuid);
}

function pointerOutSvg(uuid) {
    if(hoveringUuid == uuid)
    {
        hoveringUuid = null;
        console.log('out: ' + uuid);
    }
}

function getSign(sign, txt, spez, org, attrTxt, color) {
    var req = new XMLHttpRequest();
    req.open('GET', `/signs/${sign}.svg`, false);
    req.send();
    var svg = req.responseText
        .replace('{{TXT}}', txt)
        .replace('{{SPEZ}}', spez)
        .replace('{{ORG}}', org)
        .replace('#003399', color);
    attrTxt.split(',').forEach(attr => {
        var attrFormatted = attr.trim().toUpperCase();
        if(attrFormatted != '')
            svg = svg.replace(`{{${attrFormatted}`)
                .replace(`${attrFormatted}}}`);
    });
    return svg.replace(/{{\w+\s/g, '<!--')
        .replace(/\s\w+}}/g, '-->');
}

function getSignSvg(root, uuid, x, y) {
    var signSvg = document.createElement('g');
    signSvg.setAttribute('transform', `translate(${x}, ${y}) scale(1 1)`)
    signSvg.setAttribute('uuid', uuid);
    signSvg.classList.add('draggable');

    var txt = '';
    if (root.hasOwnProperty('txt'))
        txt = root['txt'];
    var spez = '';
    if (root.hasOwnProperty('spez'))
        spez = root['spez'];
    var org = '';
    if (root.hasOwnProperty('org'))
        org = root['org'];
    var attr = '';
    if (root.hasOwnProperty('attr'))
        attr = root['attr'];
    var color = '#003399';
    if (root.hasOwnProperty('color'))
        color = root['color'];

    signSvg.innerHTML = getSign(root['func'], txt, spez, org, attr, color);
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
    if (root.hasOwnProperty('func')) {
        var itemBox = getSignSvg(root, uuid, x, y);
        if(root.hasOwnProperty('name')) {
            var offset = -32;
            var nameParts = root['name'].split(', ');
            for (let namePart in nameParts){
                itemBox.appendChild(getText(uuid, nameParts[namePart], signWidth / 2, signHeight + offset));
                offset += 24;
            }
        }
        canvas.appendChild(itemBox);
    }
}

function drawRecursive(canvas, root, layer, x, y) {
    var rowSub = 0;
    var colSub = 0;
    var colWith = 1;
    drawSign(canvas, root, x, y);
    if(root.hasOwnProperty('with') && Array.isArray(root['with'])){
        root['with'].forEach(item => {
            drawSign(canvas, item, x + colWith * signWidth, y);
            colWith += 1;
        });
    }
    if(root.hasOwnProperty('sub') && Array.isArray(root['sub'])){
        var leafs = root['sub'].filter(item => !item.hasOwnProperty('sub') || !Array.isArray(item["sub"]) || !item["sub"].length);
        var subTrees = root["sub"].filter(item => item.hasOwnProperty('sub') && Array.isArray(item["sub"]) && item["sub"].length > 0);
        leafGap = 0;
        if (subTrees.length > 0)
            leafGap = GAP;
        for(let leaf in leafs){
            colSub += 1;
            if(colSub % subColumns == 0) {
                colSub = 1;
                rowSub += 1;
            }
            else if((colSub + colWith + layer) % maxColumns == 0) {
                colSub = 1;
                rowSub += 1;
            }
            drawRecursive(canvas, leafs[leaf], layer + 1, x + 2 * leafGap + (colWith - 1 + colSub) * signWidth, y + rowSub * signHeight);
        }
        if(leafs.length > 0)
            rowSub += 1;
        if(subTrees.length > 0) {
            canvas.appendChild(getLine(x + colWith * signWidth, y + signHeight / 2, x + GAP + colWith * signWidth, y + signHeight / 2));
            var rowLineEnd = rowSub;
            for(let subTree in subTrees) {
                canvas.appendChild(getLine(x + GAP + colWith * signWidth, y + rowSub * signHeight + signHeight / 2, x + 2 * GAP + colWith * signWidth, y + rowSub * signHeight + signHeight / 2));
                rowLineEnd = rowSub;
                rowSub += drawRecursive(canvas, subTrees[subTree], layer + 1, x + 2 * GAP + colWith * signWidth, y + rowSub * signHeight);
            }
            canvas.appendChild(getLine(x + GAP + colWith * signWidth, y + signHeight / 2, x + GAP + colWith * signWidth, y + rowLineEnd * signHeight + signHeight / 2));
        }
    }
    return Math.max(1, rowSub);
}

function draw() {
    var canvas = document.createElement('svg');
    var rows = drawRecursive(canvas, config, 0, 0, 0);
    var columns = maxColumns;

    // Draw Border
    canvas.appendChild(getLine(0, 0, columns * signWidth, 0));
    canvas.appendChild(getLine(columns * signWidth, 0, columns * signWidth, rows * signHeight + LINESIZE));
    canvas.appendChild(getLine(columns * signWidth, rows * signHeight + LINESIZE, 0, rows * signHeight + LINESIZE));
    canvas.appendChild(getLine(0, rows * signHeight + LINESIZE, 0, 0));

    // Output
    outputSvg.innerHTML = canvas.innerHTML;
    outputSvg.setAttribute('width', columns * signWidth);
    outputSvg.setAttribute('height', rows * signHeight + LINESIZE);
}

draw();