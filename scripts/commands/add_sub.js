function AddSubCmd() { }

AddSubCmd.prototype.__proto__ = new AddCmd();

AddSubCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var newSign = this.getNewSign(this.selectedElements[i], this.key);
        this.insertSub(this.selectedElements[i], newSign);
    }
    return true;
}