function DecollapseCmd() { }

DecollapseCmd.prototype.__proto__ = new CmdBase();

DecollapseCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var root = this.selectedElements[i];
        if (root.sign == 'Collapsed') {
            var parent = getParentByUuid(config, root.uuid);
            if (parent == null)
                continue;
            parent.sub = root.sub;
        }
        else if (root.sub != null) {
            var collapseSign = root.sub.find(item => item.sign == 'Collapsed');
            if (collapseSign == null)
                continue;
            root.sub = collapseSign.sub;
        }
    }
    return true;
}