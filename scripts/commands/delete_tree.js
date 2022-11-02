function DeleteTreeCmd() { }

DeleteTreeCmd.prototype.__proto__ = new RemoveCmd();

DeleteTreeCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    for (let i = 0; i < this.selectedElements.length; i++)
        this.removeTree(this.selectedElements[i]);
    return true;
}