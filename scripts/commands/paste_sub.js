function PasteSubCmd(single) {
    this.single = single;
}

PasteSubCmd.prototype.__proto__ = new AddCmd();

PasteSubCmd.prototype.single = true;

PasteSubCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clone = this.cloneCachedElements();
        if (this.single) {
            delete clone.sub;
            delete clone.with;
        }
        this.insertSub(this.selectedElements[i], clone);
    }
    return true;
}