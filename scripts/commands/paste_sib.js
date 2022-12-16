function PasteSibCmd(single) {
    this.single = single;
}

PasteSibCmd.prototype.__proto__ = new AddCmd();

PasteSibCmd.prototype.hide = false;

PasteSibCmd.prototype.single = true;

PasteSibCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    return cachedElements != null && !(Array.isArray(cachedElements) && cachedElements.length <= 0);
}

PasteSibCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            if (!this.insertSibling(selectedElement, clonedElements[idx]))
                return false;
        }
    }
    return true;
}