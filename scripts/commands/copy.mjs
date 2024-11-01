import CmdBase from "./cmd_base.mjs";

let cachedElements = [];

export default function CopyCmd() { }

CopyCmd.prototype.__proto__ = new CmdBase();

CopyCmd.prototype.execute = function () {
    cachedElements = this.selectedElements;
    return true;
}