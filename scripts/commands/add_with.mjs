import AddCmd from "./add.mjs";

export default function AddWithCmd() { }

AddWithCmd.prototype.__proto__ = new AddCmd();

AddWithCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let newSign = this.getNewSign(selectedElement, this.key);
        if (!this.insertWith(selectedElement, newSign))
            return false;
    }
    return true;
}