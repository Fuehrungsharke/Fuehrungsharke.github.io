let configHistory = [];
let undoHistory = [];

function undo() {
    if (configHistory.length <= 1)
        return;
    undoHistory.push(configHistory.pop());
    config = configHistory.pop().config;
    draw();
}

function redo() {
    if (undoHistory.length <= 0)
        return;
    config = undoHistory.pop().config;
    draw();
}