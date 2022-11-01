const maxColumns = 10
const subColumns = 5
const signWidth = 256
const signHeight = 256
const GAP = 50
const LINESIZE = 26

const WITH = 'with';
const SUB = 'sub';

var KeyCode = {
    ESC: 27,
    DEL: 46,
    C: 67,
    V: 86,
    X: 88,
    Y: 89,
    Z: 90,
}

var iptConfig = document.getElementById('iptConfig');
var zoomcontainer = document.getElementById('zoomcontainer');
var displaySvg = document.getElementById("displaySvg");
var outputSvg = document.getElementById("outputSvg");
var btnUndo = document.getElementById("btnUndo");
var btnRedo = document.getElementById("btnRedo");

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
    displaySvg.addEventListener('click', clickSign);
    displaySvg.addEventListener('pointerdown', drag);
    displaySvg.addEventListener('pointermove', dragging);
    displaySvg.addEventListener('pointerup', drop);
    displaySvg.addEventListener('pointercancel', drop);
    btnUndo.addEventListener('click', undo);
    btnRedo.addEventListener('click', redo);
}

function configSelected(evt) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        config = parseConfig(data);
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
    var item = getByUuid(config, uuid);
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

window.onkeyup = onKeyUp;

draw();