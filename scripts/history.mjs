export let configHistory = [];
let undoHistory = [];

export function undo() {
    if (configHistory.length <= 1)
        return;
    undoHistory.push(configHistory.pop());
    config = configHistory.pop().config;
    draw();
}

export function redo() {
    if (undoHistory.length <= 0)
        return;
    config = undoHistory.pop().config;
    draw();
}