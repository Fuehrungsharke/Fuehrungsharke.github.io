function ResetStaffCmd() { }

ResetStaffCmd.prototype.__proto__ = new CmdBase();

ResetStaffCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++)
        delete this.selectedElements[i].staff;
    return true;
}