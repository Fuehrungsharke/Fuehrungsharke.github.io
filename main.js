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

function editName(uuid) {
    var item = getConfigElementByUuid(config, uuid);
    let newName = prompt('Edit Name:', item['name']);
    if (newName == undefined)
        return;
    item['name'] = newName;
    draw();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
document.addEventListener('click', function (evt) {
    var close = false;
    var menuItem = getClickedElement(evt, 'context-menu-item');
    if (menuItem) {
        evt.preventDefault();
        close = clickContextMenuItem(menuItem);
    }
    else
        close = true;
    if (close)
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