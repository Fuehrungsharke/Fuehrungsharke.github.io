import AddCmd from "./add.mjs";

export default function AddSubCmd() { }

AddSubCmd.prototype.__proto__ = new AddCmd();

AddSubCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let newSign = this.getNewSign(selectedElement, this.key);
        if (!this.insertSub(selectedElement, newSign))
            return false;
    }
    return true;
}