import RemoveCmd from "./remove.mjs";
import { setCachedElements } from './copy.mjs';

export default function CutSingleCmd() { }

CutSingleCmd.prototype.__proto__ = new RemoveCmd();

CutSingleCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    setCachedElements(this.selectedElements);
    for (const selectedElement of this.selectedElements)
        this.removeSingle(selectedElement);
    return true;
}