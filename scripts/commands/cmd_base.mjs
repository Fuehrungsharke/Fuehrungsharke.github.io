export default function CmdBase() { }

CmdBase.prototype.key = null;
CmdBase.prototype.selectedElements = null;
CmdBase.prototype.hide = true;

CmdBase.prototype.isExecuteable = function () {
    return Array.isArray(this.selectedElements) && this.selectedElements.length > 0;
}