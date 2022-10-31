function PasteSibCmd(single) {
    this.single = single;
}

PasteSibCmd.prototype.__proto__ = new AddCmd();

PasteSibCmd.prototype.single = true;

PasteSibCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            if (this.single) {
                delete clonedElements[idx].sub;
                delete clonedElements[idx].with;
            }
            this.insertSibling(this.selectedElements[i], clonedElements[idx]);
        }
    }
    return true;
}