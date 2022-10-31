function CollapseCmd() { }

CollapseCmd.prototype.__proto__ = new CmdBase();

CollapseCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var root = this.selectedElements[i];
        if (root.sub == null)
            continue;
        var collapseSign = root.sub.find(item => item.sign == 'Collapsed');
        if (root.sign == 'Collapsed' || collapseSign != null)
            continue;
        collapseSign = {
            "sign": "Collapsed",
            "txt": "[...]",
            "sub": root.sub
        };
        var staff = getStaff(collapseSign);
        if (staff[0] > 0 || staff[1] > 0 || staff[2] > 0 || staff[3] > 0)
            collapseSign.show_staff = true;
        root.sub = [collapseSign];
    }
    return true;
}