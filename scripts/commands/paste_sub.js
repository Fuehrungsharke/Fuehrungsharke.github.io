function PasteSubCmd(single) {
    this.single = single;
}

PasteSubCmd.prototype.__proto__ = new AddCmd();

PasteSubCmd.prototype.hide = false;

PasteSubCmd.prototype.single = true;

PasteSubCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    return cachedElements != null && !(Array.isArray(cachedElements) && cachedElements.length <= 0);
}

PasteSubCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            if (!this.insertSub(selectedElement, clonedElements[idx]))
                return false;
        }
    }
    return true;
}