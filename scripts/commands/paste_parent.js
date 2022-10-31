function PasteParentCmd() { }

PasteParentCmd.prototype.__proto__ = new AddCmd();

PasteParentCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clone = this.cloneCachedElements();
        delete clone.sub;
        delete clone.with;
        this.insertParent(this.selectedElements[i], clone);
    }
    return true;
}