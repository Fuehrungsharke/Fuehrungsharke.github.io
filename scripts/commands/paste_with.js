function PasteWithCmd() { }

PasteWithCmd.prototype.__proto__ = new AddCmd();

PasteWithCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            delete clonedElements[idx].sub;
            delete clonedElements[idx].with;
            this.insertWith(this.selectedElements[i], clonedElements[idx]);
        }
    }
    return true;
}