function PasteParentCmd() { }

PasteParentCmd.prototype.__proto__ = new AddCmd();

PasteParentCmd.prototype.hide = false;

PasteParentCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    if (cachedElements == null || (Array.isArray(cachedElements) && cachedElements.length <= 0))
        return false;
    if (Array.isArray(cachedElements) && cachedElements.length > 1)
        return false;
    return true;
}

PasteParentCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            delete clonedElements[idx].sub;
            delete clonedElements[idx].with;
            if (!this.insertParent(this.selectedElements[i], clonedElements[idx]))
                return false;
        }
    }
    return true;
}