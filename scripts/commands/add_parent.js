function AddParentCmd() { }

AddParentCmd.prototype.__proto__ = new AddCmd();

AddParentCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        let newSign = this.getNewSign(this.selectedElements[i], this.key);
        if (!this.insertParent(this.selectedElements[i], newSign))
            return false;
    }
    return true;
}