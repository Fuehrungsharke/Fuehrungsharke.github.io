function AddParentCmd() { }

AddParentCmd.prototype.__proto__ = new AddCmd();

AddParentCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var newSign = this.getNewSign(this.selectedElements[i], this.key);
        this.insertParent(this.selectedElements[i], newSign);
    }
    return true;
}