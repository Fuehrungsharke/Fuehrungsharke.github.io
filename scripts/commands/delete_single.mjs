import RemoveCmd from './remove.mjs';

export default function DeleteSingleCmd() { }

DeleteSingleCmd.prototype.__proto__ = new RemoveCmd();

DeleteSingleCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    for (const selectedElement of this.selectedElements)
        this.removeSingle(selectedElement);
    return true;
}