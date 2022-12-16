function DecollapseCmd() { }

DecollapseCmd.prototype.__proto__ = new CmdBase();

DecollapseCmd.prototype.isExecuteable = function () {
    if (Array.isArray(this.selectedElements) && this.selectedElements.length > 0)
        return this.selectedElements.some(item => item.sub != null && item.sub.some(item => item.sign == 'Collapsed'));
    return false;
}

DecollapseCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        let root = this.selectedElements[i];
        if (root.sign == 'Collapsed') {
            let parent = getParentByUuid(config, root.uuid);
            if (parent == null)
                continue;
            parent.sub = root.sub;
        }
        else if (root.sub != null) {
            let collapseSign = root.sub.find(item => item.sign == 'Collapsed');
            if (collapseSign == null)
                continue;
            root.sub = collapseSign.sub;
        }
    }
    return true;
}