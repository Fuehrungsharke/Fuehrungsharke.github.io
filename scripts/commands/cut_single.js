function CutSingleCmd() { }

CutSingleCmd.prototype.__proto__ = new RemoveCmd();

CutSingleCmd.prototype.execute = function () {
    cachedElements = this.selectedElements;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeSingle(this.selectedElements[i]);
    return true;
}