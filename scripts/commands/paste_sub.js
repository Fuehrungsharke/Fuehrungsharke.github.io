function PasteSubCmd(single) {
    this.single = single;
}

PasteSubCmd.prototype.__proto__ = new AddCmd();

PasteSubCmd.prototype.single = true;

PasteSubCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            this.insertSub(this.selectedElements[i], clonedElements[idx]);
        }
    }
    return true;
}