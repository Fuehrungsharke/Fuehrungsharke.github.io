import AddCmd from "./add.mjs";

export default function AddSibCmd() { }

AddSibCmd.prototype.__proto__ = new AddCmd();

AddSibCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let newSign = this.getNewSign(selectedElement, this.key);
        if (!this.insertSibling(selectedElement, newSign))
            return false;
    }
    return true;
}