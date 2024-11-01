import AddCmd from './add.mjs';
import { cachedElements } from './copy.mjs';

export default function PasteWithCmd() { }

PasteWithCmd.prototype.__proto__ = new AddCmd();

PasteWithCmd.prototype.hide = false;

PasteWithCmd.prototype.isExecuteable = function () {
    if (!Array.isArray(this.selectedElements) || this.selectedElements.length <= 0)
        return false;
    return cachedElements != null && !(Array.isArray(cachedElements) && cachedElements.length <= 0);
}

PasteWithCmd.prototype.execute = function () {
    for (const selectedElement of this.selectedElements) {
        let clonedElements = this.cloneCachedElements();
        for (let idx in clonedElements) {
            delete clonedElements[idx].sub;
            delete clonedElements[idx].with;
            if (!this.insertWith(selectedElement, clonedElements[idx]))
                return false;
        }
    }
    return true;
}