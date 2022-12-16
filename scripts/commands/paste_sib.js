function PasteSibCmd(single) {
    this.single = single;
}

PasteSibCmd.prototype.__proto__ = new AddCmd();

PasteSibCmd.prototype.hide = false;

PasteSibCmd.prototype.single = true;

PasteSibCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    if (cachedElements == null || (Array.isArray(cachedElements) && cachedElements.length <= 0))
        return false;
    return true;
}

PasteSibCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            if (!this.insertSibling(this.selectedElements[i], clonedElements[idx]))
                return false;
        }
    }
    return true;
}