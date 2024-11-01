import { draw } from './canvas.mjs';
import { setConfig } from './config.mjs';

export let configHistory = [];
let undoHistory = [];

export function undo() {
    if (configHistory.length <= 1)
        return;
    undoHistory.push(configHistory.pop());
    setConfig(configHistory.pop().config);
    draw();
}

export function redo() {
    if (undoHistory.length <= 0)
        return;
    setConfig(undoHistory.pop().config);
    draw();
}