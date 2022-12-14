document.getElementById('btnDownloadConfig').addEventListener('click', evt => {
    download(JSON.stringify(removeUuid(config), null, 2), 'text/json', 'FüHarke.json');
});

document.getElementById('btnDownloadSvg').addEventListener('click', evt => {
    download(outputSvg.outerHTML, 'image/svg', 'FüHarke.svg');
});

document.getElementById('btnDownloadPng').addEventListener('click', evt => {
    downloadPng(outputSvg, 'FüHarke.png');
});

function onKeyUp(evt) {
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
    else if (evt.keyCode == KeyCode.A && evt.ctrlKey) {
        updateSelection({
            'minX': 0,
            'minY': 0,
            'maxX': size.width,
            'maxY': size.height,
        }, 'normal');
        clearSelectionRect();
    }
    else if (evt.keyCode == KeyCode.C && evt.ctrlKey) {
        var cutCmd = new CopyCmd();
        cutCmd.selectedElements = getSelectedElements();
        cutCmd.execute();
    }
    else if (evt.keyCode == KeyCode.X && evt.ctrlKey) {
        var cutCmd = null;
        if (evt.shiftKey)
            cutCmd = new CutSingleCmd();
        else
            cutCmd = new CutTreeCmd();
        cutCmd.selectedElements = getSelectedElements();
        if (cutCmd.execute())
            draw();
    }
    else if (evt.keyCode == KeyCode.V && evt.ctrlKey) {
        var cutCmd = new PasteSubCmd();
        cutCmd.single = evt.shiftKey;
        cutCmd.selectedElements = getSelectedElements();
        if (cutCmd.execute())
            draw();
    }
    else if (evt.keyCode == KeyCode.DEL) {
        var delCmd = null;
        if (evt.shiftKey)
            delCmd = new DeleteSingleCmd();
        else
            delCmd = new DeleteTreeCmd();
        delCmd.selectedElements = getSelectedElements();
        if (delCmd.execute())
            draw();
    }
}

function clickSign(evt) {
    if (evt.detail == 2 && hoveringUuid != null) {
        var root = getByUuid(config, hoveringUuid);
        if (root.sign == 'Collapsed') {
            var parent = getParentByUuid(config, hoveringUuid);
            if (parent == null)
                return;
            parent.sub = root.sub;
        }
        else {
            var collapseSign = null;
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
}