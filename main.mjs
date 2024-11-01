import { draw } from './scripts/canvas.mjs';
import { onKeyUp, clickSign } from './scripts/events.mjs';
import { drag, dragging, drop } from './scripts/dragdrop/dragdrop.mjs';
import { undo, redo } from './scripts/history.mjs';
import { openSignContextMenu, clickContextMenuItem, closeSignContextMenu } from './scripts/contextmenu/contextmenu.mjs';
import setUpBBox from './scripts/bbox.mjs';

let iptConfig = document.getElementById('iptConfig');
let zoomcontainer = document.getElementById('zoomcontainer');
let displaySvg = document.getElementById("displaySvg");
let outputSvg = document.getElementById("outputSvg");
let btnUndo = document.getElementById("btnUndo");
let btnRedo = document.getElementById("btnRedo");

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

    let cbxBackground = document.getElementById("cbxBackground");
    cbxBackground.addEventListener('change', draw);

    let cbxBorder = document.getElementById("cbxBorder");
    cbxBorder.addEventListener('change', draw);
}

function configSelected(evt) {
    let reader = new FileReader();
    reader.onload = function (e) {
        let data = e.target.result;
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

setUpBBox();
draw();