function CutSingleCmd() { }

CutSingleCmd.prototype.__proto__ = new RemoveCmd();

CutSingleCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    cachedElements = this.selectedElements;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeSingle(this.selectedElements[i]);
    return true;
}