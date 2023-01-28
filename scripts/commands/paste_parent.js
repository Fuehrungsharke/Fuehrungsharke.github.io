function PasteParentCmd() { }

PasteParentCmd.prototype.__proto__ = new AddCmd();

PasteParentCmd.prototype.hide = false;

PasteParentCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    if (cachedElements == null || (Array.isArray(cachedElements) && cachedElements.length <= 0))
        return false;
    return !Array.isArray(cachedElements) || cachedElements.length <= 1;
}

PasteParentCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            delete clonedElements[idx].sub;
            delete clonedElements[idx].with;
            if (!this.insertParent(selectedElement, clonedElements[idx]))
                return false;
        }
    }
    return true;
}