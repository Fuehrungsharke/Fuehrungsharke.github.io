function onKeyUp(evt) {
    if (evt.keyCode === KeyCode.ESC) {
        closeSignContextMenu();
        clearSelection();
    }
    else if (evt.keyCode === KeyCode.Z && evt.ctrlKey)
        undo();
    else if (evt.keyCode === KeyCode.Y && evt.ctrlKey)
        redo();
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