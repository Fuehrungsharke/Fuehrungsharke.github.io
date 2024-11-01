import RemoveCmd from "./remove.mjs";
import { setCachedElements } from './copy.mjs';

export default function CutTreeCmd() { }

CutTreeCmd.prototype.__proto__ = new RemoveCmd();

CutTreeCmd.prototype.execute = function () {
    if (!this.isExecuteable())
        return;
    setCachedElements(this.selectedElements);
    for (const selectedElement of this.selectedElements)
        this.removeTree(selectedElement);
    return true;
}