function AddWithCmd() { }

AddWithCmd.prototype.__proto__ = new AddCmd();

AddWithCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var newSign = this.getNewSign(this.selectedElements[i], this.key);
        this.insertWith(this.selectedElements[i], newSign);
    }
    return true;
}