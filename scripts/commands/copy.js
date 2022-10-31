var cachedElements = [];

function CopyCmd() { }

AddCmd.prototype.__proto__ = new CmdBase();

CopyCmd.prototype.execute = function () {
    cachedElements = this.selectedElements;
    return true;
}