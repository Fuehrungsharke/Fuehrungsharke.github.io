function CmdBase() { }

CmdBase.prototype.key = null;
CmdBase.prototype.selectedElements = null;
CmdBase.prototype.parentLogical = null;
CmdBase.prototype.parentLayer = null;

CmdBase.prototype.isExecuteable = function () {
    return false;
}