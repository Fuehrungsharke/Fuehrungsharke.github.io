function DecollapseCmd() { }

DecollapseCmd.prototype.__proto__ = new CmdBase();

DecollapseCmd.prototype.isExecuteable = function () {
    if (Array.isArray(this.selectedElements) && this.selectedElements.length > 0)
        return this.selectedElements.some(item => item.sub != null && item.sub.some(item => item.sign == 'Collapsed'));
    return false;
}

DecollapseCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        if (selectedElement.sign == 'Collapsed') {
            let parent = getParentByUuid(config, selectedElement.uuid);
            if (parent == null)
                continue;
            parent.sub = selectedElement.sub;
        }
        else if (selectedElement.sub != null) {
            let collapseSign = selectedElement.sub.find(item => item.sign == 'Collapsed');
            if (collapseSign == null)
                continue;
            selectedElement.sub = collapseSign.sub;
        }
    }
    return true;
}