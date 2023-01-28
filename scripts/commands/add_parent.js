function AddParentCmd() { }

AddParentCmd.prototype.__proto__ = new AddCmd();

AddParentCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let newSign = this.getNewSign(selectedElement, this.key);
        if (!this.insertParent(selectedElement, newSign))
            return false;
    }
    return true;
}