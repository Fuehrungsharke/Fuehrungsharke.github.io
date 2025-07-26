const maxColumns = 10
const subColumns = 5
const GAP = 50
const LINESIZE = 26
const WITH = 'with';
const SUB = 'sub';

let KeyCode = {
    ESC: 27,
    DEL: 46,
    A: 65,
    C: 67,
    V: 86,
    X: 88,
    Y: 89,
    Z: 90,
}

let iptConfig = document.getElementById('iptConfig');
let zoomcontainer = document.getElementById('zoomcontainer');
let displaySvg = document.getElementById("displaySvg");
let outputSvg = document.getElementById("outputSvg");
let btnUndo = document.getElementById("btnUndo");
let btnRedo = document.getElementById("btnRedo");
let btnOV = document.getElementById("btnOV");
let btnTZ = document.getElementById("btnTZ");
let btnTZFGr = document.getElementById("btnTZFGr");
let btnLog = document.getElementById("btnLog");
let btnFK = document.getElementById("btnFK");
let btnUnit = document.getElementById("btnUnit");
let cbxBackground = document.getElementById('cbxBackground');
let cbxBorder = document.getElementById('cbxBorder');
let cbxInactiveNonEB = document.getElementById('cbxInactiveNonEB');

function getEvtPos(evt) {
    let touchpos = evt;
    if (touchpos.clientX == undefined)
        touchpos = evt.targetTouches[0];
    return touchpos;
}

function getClickedElement(evt, className) {
    let evtElement = evt.srcElement || evt.target;
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
    btnOV.addEventListener('click', evt => loadStAN(StAN_OV));
    btnTZ.addEventListener('click', evt => loadStAN(StAN_TZ));
    btnTZFGr.addEventListener('click', evt => loadStAN(StAN_TZ_FGr));
    btnLog.addEventListener('click', evt => loadStAN(StAN_Log));
    btnFK.addEventListener('click', evt => loadStAN(StAN_FK));
    btnUnit.addEventListener('click', evt => loadStAN([
        {
            "sign": "Unit",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW"
        }
    ]));
}

function loadStAN(StAN) {
    if(!confirm('Aktuelle Konfiguration wird verworfen!'))
        return;
    config = StAN;
    config.layout = "center-below";
    draw();
}

function configSelected(evt) {
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;
        if(data == null)
            return;
        config = parseConfig(data);
        draw();
    }
    reader.readAsDataURL(evt.target.files[0]);
}

function editName(uuid) {
    let item = getByUuid(config, uuid);
    let newName = prompt('Name', item['name']);
    if (newName == undefined)
        return;
    if (newName == '')
        delete item['name'];
    else
        item['name'] = newName;
    draw();
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded);
document.addEventListener('click', function (evt) {
    let close = false;
    let menuItem = getClickedElement(evt, 'context-menu-item');
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
    let sign = getClickedElement(evt, 'editable');
    if (sign) {
        evt.preventDefault();
        openSignContextMenu(evt, sign);
    }
    else if (getClickedElement(evt, 'noContextMenu'))
        evt.preventDefault();
});

window.onkeyup = onKeyUp;

draw();