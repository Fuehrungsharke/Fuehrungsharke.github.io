function DeleteSingleCmd() { }

DeleteSingleCmd.prototype.__proto__ = new RemoveCmd();

DeleteSingleCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeSingle(this.selectedElements[i]);
    return true;
}