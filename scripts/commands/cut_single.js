function CutSingleCmd() { }

CutSingleCmd.prototype.__proto__ = new RemoveCmd();

CutSingleCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    this.cachedElements = this.selectedElements;
    for (const selectedElement of this.selectedElements)
        this.removeSingle(selectedElement);
    return true;
}