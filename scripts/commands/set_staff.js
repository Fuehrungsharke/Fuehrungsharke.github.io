function SetStaffCmd() { }

SetStaffCmd.prototype.__proto__ = new CmdBase();

SetStaffCmd.prototype.execute = function () {
    var newStaffTxt = prompt('Stärke', toText(getStaff(this.selectedElements[0])));
    var newStaff = toStaff(newStaffTxt);
    if (newStaff == null || newStaff.length != 4) {
        alert('Ungültiges Format');
        return false;
    }
    if (newStaff[0] + newStaff[1] + newStaff[2] != newStaff[3]) {
        alert(`Validierung fehlgeschlagen!\n${newStaff[0]} + ${newStaff[1]} + ${newStaff[2]} != ${newStaff[3]}`);
        return false;
    }

    for (let i = 0; i < this.selectedElements.length; i++) {
        this.selectedElements[i].staff = newStaff;
        this.selectedElements[i].show_staff = true;
    }
    return true;
}