import CmdBase from "./cmd_base.mjs";

export default function ResetStaffCmd() { }

ResetStaffCmd.prototype.__proto__ = new CmdBase();

ResetStaffCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    return this.selectedElements.some(item => item.staff != null);
}

ResetStaffCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements)
        delete selectedElement.staff;
    return true;
}