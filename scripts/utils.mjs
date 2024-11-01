import { SUB, WITH } from './ui_const.mjs';

function isAncestorOf(item, presumedDescendant) {
    if (presumedDescendant.sub != null && Array.isArray(presumedDescendant.sub)) {
        for (let idx in presumedDescendant.sub) {
            if (presumedDescendant.sub[idx] == item)
                return true;
            let subResult = isAncestorOf(item, presumedDescendant.sub[idx]);
            if (subResult)
                return subResult;
        }
    }
    if (presumedDescendant.with != null && Array.isArray(presumedDescendant.with)) {
        for (let idx in presumedDescendant.with) {
            if (presumedDescendant.with[idx] == item)
                return true;
            let subResult = isAncestorOf(item, presumedDescendant.with[idx]);
            if (subResult)
                return subResult;
        }
    }
    return false;
}

export function getByUuid(root, uuid) {
    if (Array.isArray(root) && root.length > 0)
        for (let idx in root) {
            let subResult = getByUuid(root[idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    if (root.hasOwnProperty('uuid') && root.uuid == uuid)
        return root;
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]))
        for (let idx in root[SUB]) {
            let subResult = getByUuid(root[SUB][idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH]))
        for (let idx in root[WITH]) {
            let subResult = getByUuid(root[WITH][idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    return null;
}

function getParentByUuid(root, uuid) {
    if (Array.isArray(root) && root.length > 0)
        for (let idx in root) {
            if (root[idx].hasOwnProperty('uuid') && root[idx].uuid == uuid)
                return root;
            let subResult = getParentByUuid(root[idx], uuid);
            if (subResult != null)
                return subResult;
        }
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]))
        for (let idx in root[SUB]) {
            if (root[SUB][idx].hasOwnProperty('uuid') && root[SUB][idx].uuid == uuid)
                return root;
            let subResult = getParentByUuid(root[SUB][idx], uuid);
            if (subResult != null)
                return subResult;
        }
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH]))
        for (let idx in root[WITH]) {
            if (root[WITH][idx].hasOwnProperty('uuid') && root[WITH][idx].uuid == uuid)
                return root;
            let subResult = getParentByUuid(root[WITH][idx], uuid);
            if (subResult != null)
                return subResult;
        }
    return null;
}

function getSelectedElements() {
    let selectedElements = [];
    let selectedSigns = outputSvg.getElementsByClassName('selected');
    for (const selectedSign of selectedSigns)
        selectedElements.push(getByUuid(config, selectedSign.getAttributeNS(null, 'uuid')));
    return selectedElements;
}