function CmdBase() { }

CmdBase.prototype.key = null;
CmdBase.prototype.selectedElements = null;
CmdBase.prototype.parentLogical = null;
CmdBase.prototype.parentLayer = null;
CmdBase.prototype.hide = true;

CmdBase.prototype.isExecuteable = function () {
    return Array.isArray(this.selectedElements) && this.selectedElements.length > 0;
}
