function CutTreeCmd() { }

CutTreeCmd.prototype.__proto__ = new RemoveCmd();

CutTreeCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    cachedElements = this.selectedElements;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeTree(this.selectedElements[i]);
    return true;
}