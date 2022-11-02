function AddSibCmd() { }

AddSibCmd.prototype.__proto__ = new AddCmd();

AddSibCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var newSign = this.getNewSign(this.selectedElements[i], this.key);
        this.insertSibling(this.selectedElements[i], newSign);
    }
    return true;
}