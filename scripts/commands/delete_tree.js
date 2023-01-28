function DeleteTreeCmd() { }

DeleteTreeCmd.prototype.__proto__ = new RemoveCmd();

DeleteTreeCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    for (const selectedElement of this.selectedElements)
        this.removeTree(selectedElement);
    return true;
}