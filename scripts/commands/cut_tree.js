function CutTreeCmd() { }

CutTreeCmd.prototype.__proto__ = new RemoveCmd();

CutTreeCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    this.cachedElements = this.selectedElements;
    for (const selectedElement of this.selectedElements)
        this.removeTree(selectedElement);
    return true;
}