import { closeSignContextMenu } from './contextmenu/contextmenu.mjs';

const monthAbbreviations = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
];

export function getEvtPos(evt) {
    let touchpos = evt;
    if (touchpos.clientX == undefined)
        touchpos = evt.targetTouches[0];
    return touchpos;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size)
        num = '0' + num;
    return num;
}

function getDownloadFileName() {
    let now = new Date();
    return `${pad(now.getDate(), 2)}${pad(now.getHours(), 2)}${pad(now.getMinutes(), 2)}${monthAbbreviations[now.getMonth()]}${now.getFullYear()}`;
}

document.getElementById('btnDownloadConfig').addEventListener('click', evt => {
    download(JSON.stringify(removeUuid(config), null, 2), 'text/json', `${getDownloadFileName()}.json`);
});

document.getElementById('btnDownloadSvg').addEventListener('click', evt => {
    download(outputSvg.outerHTML
        .replaceAll(/uuid="([0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12})"/ig, '')
        .replaceAll(/onpointerover\=\"pointerOverSvg\(\'([0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12})\'\)\"/ig, '')
        .replaceAll(/onpointerout\=\"pointerOutSvg\(\'([0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12})\'\)\"/ig, '')
        .replaceAll(/onclick\=\"editName\(\'([0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12})\'\)\"/ig, '')
        .replaceAll(/\{\{[\w\:\=\,\s]*\}\}/gi, '')
        .replaceAll(/class\=\"[\w\s]*\"/gi, '')
        .replaceAll(/touch\-action\=\"none\"/gi, '')
        .replaceAll(/\ {2,}/gi, ' '),
        'image/svg', `${getDownloadFileName()}.svg`
    );
});

document.getElementById('btnDownloadPng').addEventListener('click', evt => {
    downloadPng(outputSvg, `${getDownloadFileName()}.png`);
});

function markAll() {
    updateSelection({
        'minX': 0,
        'minY': 0,
        'maxX': size.width,
        'maxY': size.height,
    }, 'normal');
    clearSelectionRect();
}

function copySelection() {
    let copyCmd = new CopyCmd();
    copyCmd.selectedElements = getSelectedElements();
    copyCmd.execute();
}

function cutSelection() {
    let cutCmd = null;
    if (evt.shiftKey)
        cutCmd = new CutSingleCmd();
    else
        cutCmd = new CutTreeCmd();
    cutCmd.selectedElements = getSelectedElements();
    if (cutCmd.execute())
        draw();
}

function pasteToSelection() {
    let pasteCmd = new PasteSubCmd();
    pasteCmd.single = evt.shiftKey;
    pasteCmd.selectedElements = getSelectedElements();
    if (pasteCmd.execute())
        draw();
}

function deleteSelection() {
    let delCmd = null;
    if (evt.shiftKey)
        delCmd = new DeleteSingleCmd();
    else
        delCmd = new DeleteTreeCmd();
    delCmd.selectedElements = getSelectedElements();
    if (delCmd.execute())
        draw();
}

export function onKeyUp(evt) {
    if (evt.keyCode === KeyCode.ESC) {
        closeSignContextMenu();
        clearSelection();
        clearDragged();
        draw();
    }
    else if (evt.keyCode == KeyCode.Z && evt.ctrlKey)
        undo();
    else if (evt.keyCode == KeyCode.Y && evt.ctrlKey)
        redo();
    else if (evt.keyCode == KeyCode.A && evt.ctrlKey)
        markAll();
    else if (evt.keyCode == KeyCode.C && evt.ctrlKey)
        copySelection();
    else if (evt.keyCode == KeyCode.X && evt.ctrlKey)
        cutSelection();
    else if (evt.keyCode == KeyCode.V && evt.ctrlKey)
        pasteToSelection();
    else if (evt.keyCode == KeyCode.DEL)
        deleteSelection();
}

export function clickSign(evt) {
    if (evt.detail != 2 || hoveringUuid == null)
        return;
    let root = getByUuid(config, hoveringUuid);
    if (root.sign == 'Collapsed') {
        let parent = getParentByUuid(config, hoveringUuid);
        if (parent == null)
            return;
        parent.sub = root.sub;
    }
    else {
        let collapseSign = null;
        if (root.sub != null)
            collapseSign = root.sub.find(item => item.sign == 'Collapsed');
        if (collapseSign != null)
            root.sub = collapseSign.sub;
        else if (root.inactive)
            delete root.inactive;
        else
            root.inactive = true;
    }
    draw();
}