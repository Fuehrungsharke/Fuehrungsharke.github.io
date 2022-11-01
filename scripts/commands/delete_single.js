function DeleteSingleCmd() { }

DeleteSingleCmd.prototype.__proto__ = new RemoveCmd();

DeleteSingleCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeSingle(this.selectedElements[i]);
    return true;
}