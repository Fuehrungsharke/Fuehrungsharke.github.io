function CutTreeCmd() { }

CutTreeCmd.prototype.__proto__ = new RemoveCmd();

CutTreeCmd.prototype.execute = function () {
    cachedElements = this.selectedElements;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeTree(this.selectedElements[i]);
    return true;
}