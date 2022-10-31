var cachedElements = [];

function CopyCmd() { }

AddCmd.prototype.__proto__ = new CmdBase();

CopyCmd.prototype.isExecuteable = function (targetElements, key) {
    return Array.isArray(targetElements) && targetElements.length > 0;
}

CopyCmd.prototype.execute = function (targetElements, key) {
    cachedElements = targetElements;
    return true;
}