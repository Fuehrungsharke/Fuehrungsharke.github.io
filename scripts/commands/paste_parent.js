function PasteParentCmd() { }

PasteParentCmd.prototype.__proto__ = new AddCmd();

PasteParentCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            delete clonedElements[idx].sub;
            delete clonedElements[idx].with;
            this.insertParent(this.selectedElements[i], clonedElements[idx]);
        }
    }
    return true;
}