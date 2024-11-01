import CmdBase from "./cmd_base.mjs";
import { getParentByUuid } from '../utils.mjs';
import { SUB, WITH } from '../ui_const.mjs';
import { config, setConfig } from '../config.mjs';

export default function RemoveCmd() { }

RemoveCmd.prototype.__proto__ = new CmdBase();

RemoveCmd.prototype.removeSingle = function (root) {
    if (root == config) {
        if (root.with != null && Array.isArray(root.with) && root.with.length > 0) {
            let firstWith = root.with[0];
            firstWith.sub = root.sub;
            firstWith.with = root.with.filter(item => item != firstWith);
            if (firstWith.with.length == 0)
                delete firstWith.with;
            setConfig(firstWith);
        }
        else if (root.sub != null && Array.isArray(root.sub))
            setConfig(root.sub);
        return;
    }
    let source = getParentByUuid(config, root.uuid);
    if (source != null) {
        if (source.hasOwnProperty(SUB) && Array.isArray(source[SUB])) {
            let idx = source.sub.indexOf(root);
            if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH]) && root.with.length > 0) {
                let firstWith = root.with[0];
                firstWith.sub = root.sub;
                firstWith.with = root.with.filter(item => item != firstWith);
                if (firstWith.sub.length == 0)
                    delete firstWith.sub;
                if (firstWith.with.length == 0)
                    delete firstWith.with;
                source.sub[idx] = firstWith;
            }
            else if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]) && root.sub.length > 0)
                source.sub = source.sub.slice(0, idx).concat(root.sub).concat(source.sub.slice(idx + 1, source.sub.length));
            else
                source.sub = source.sub.filter(item => item != root);
            if (source.sub.length == 0)
                delete source.sub;
        }
        if (source.hasOwnProperty(WITH) && Array.isArray(source[WITH])) {
            source.with = source.with.filter(item => item != root);
            if (source.with.length == 0)
                delete source.with;
        }
    }
}

RemoveCmd.prototype.removeTree = function (root) {
    if (Array.isArray(config)) {
        setConfig(config.filter(item => item != root));
        if (config.length == 0)
            setConfig(null);
    }
    else if (root == config)
        setConfig(null);
    if (config == null) {
        setConfig({
            'sign': "Unit",
            'colorPrimary': '#FFF',
            'colorAccent': '#000'
        });
        return;
    }
    let source = getParentByUuid(config, root.uuid);
    if (source != null) {
        if (source.hasOwnProperty(SUB) && Array.isArray(source[SUB])) {
            source.sub = source.sub.filter(item => item != root);
            if (source.sub.length == 0)
                delete source.sub;
        }
        if (source.hasOwnProperty(WITH) && Array.isArray(source[WITH])) {
            source.with = source.with.filter(item => item != root);
            if (source.with.length == 0)
                delete source.with;
        }
    }
}