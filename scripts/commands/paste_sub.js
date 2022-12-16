function PasteSubCmd(single) {
    this.single = single;
}

PasteSubCmd.prototype.__proto__ = new AddCmd();

PasteSubCmd.prototype.hide = false;

PasteSubCmd.prototype.single = true;

PasteSubCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    if (cachedElements == null || (Array.isArray(cachedElements) && cachedElements.length <= 0))
        return false;
    return true;
}

PasteSubCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            if (!this.insertSub(this.selectedElements[i], clonedElements[idx]))
                return false;
        }
    }
    return true;
}