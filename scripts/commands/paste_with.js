function PasteWithCmd() { }

PasteWithCmd.prototype.__proto__ = new AddCmd();

PasteWithCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clone = this.cloneCachedElements();
        delete clone.sub;
        delete clone.with;
        this.insertWith(this.selectedElements[i], clone);
    }
    return true;
}