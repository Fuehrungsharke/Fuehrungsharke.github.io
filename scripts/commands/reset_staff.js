function ResetStaffCmd() { }

ResetStaffCmd.prototype.__proto__ = new CmdBase();

ResetStaffCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    return this.selectedElements.some(item => item.staff != null);
}

ResetStaffCmd.prototype.execute = function () {
    for (let i = 0; i < this.selectedElements.length; i++)
        delete this.selectedElements[i].staff;
    return true;
}