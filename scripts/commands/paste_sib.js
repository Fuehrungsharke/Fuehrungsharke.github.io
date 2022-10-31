function PasteSibCmd(single) {
    this.single = single;
}

PasteSibCmd.prototype.__proto__ = new AddCmd();

PasteSibCmd.prototype.single = true;

PasteSibCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++) {
        var clone = this.cloneCachedElements();
        if (this.single) {
            delete clone.sub;
            delete clone.with;
        }
        this.insertSibling(this.selectedElements[i], clone);
    }
    return true;
}