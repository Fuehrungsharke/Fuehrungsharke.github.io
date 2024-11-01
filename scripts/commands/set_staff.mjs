import CmdBase from "./cmd_base.mjs";
import { getStaff, toText, toStaff } from '../staff.mjs';

export default function SetStaffCmd() { }

SetStaffCmd.prototype.__proto__ = new CmdBase();

SetStaffCmd.prototype.execute = function () {
    let newStaffTxt = prompt('Stärke', toText(getStaff(this.selectedElements[0])));
    let newStaff = toStaff(newStaffTxt);
    if (newStaff == null || newStaff.length != 4) {
        alert('Ungültiges Format');
        return false;
    }
    if (newStaff[0] + newStaff[1] + newStaff[2] != newStaff[3]) {
        alert(`Validierung fehlgeschlagen!\n${newStaff[0]} + ${newStaff[1]} + ${newStaff[2]} != ${newStaff[3]}`);
        return false;
    }

    for (const selectedElement of this.selectedElements) {
        selectedElement.staff = newStaff;
        selectedElement.show_staff = true;
    }
    return true;
}