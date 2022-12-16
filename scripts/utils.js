function isAncestorOf(item, presumedDescendant) {
    if (presumedDescendant.sub != null && Array.isArray(presumedDescendant.sub)) {
        for (let idx in presumedDescendant.sub) {
            if (presumedDescendant.sub[idx] == item)
                return true;
            var subResult = isAncestorOf(item, presumedDescendant.sub[idx]);
            if (subResult)
                return subResult;
        }
    }
    if (presumedDescendant.with != null && Array.isArray(presumedDescendant.with)) {
        for (let idx in presumedDescendant.with) {
            if (presumedDescendant.with[idx] == item)
                return true;
            var subResult = isAncestorOf(item, presumedDescendant.with[idx]);
            if (subResult)
                return subResult;
        }
    }
    return false;
}

function getByUuid(root, uuid) {
    if (Array.isArray(root) && root.length > 0)
        for (let idx in root) {
            var subResult = getByUuid(root[idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    if (root.hasOwnProperty('uuid') && root.uuid == uuid)
        return root;
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]))
        for (let idx in root[SUB]) {
            var subResult = getByUuid(root[SUB][idx], uuid);
            if (subResult != undefined)
                return subResult;
        }
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH]))
        for (let idx in root[WITH]) {
            var subResult = getByUuid(root[WITH][idx], uuid);
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
            var subResult = getParentByUuid(root[idx], uuid);
            if (subResult != null)
                return subResult;
        }
    if (root.hasOwnProperty(SUB) && Array.isArray(root[SUB]))
        for (let idx in root[SUB]) {
            if (root[SUB][idx].hasOwnProperty('uuid') && root[SUB][idx].uuid == uuid)
                return root;
            var subResult = getParentByUuid(root[SUB][idx], uuid);
            if (subResult != null)
                return subResult;
        }
    if (root.hasOwnProperty(WITH) && Array.isArray(root[WITH]))
        for (let idx in root[WITH]) {
            if (root[WITH][idx].hasOwnProperty('uuid') && root[WITH][idx].uuid == uuid)
                return root;
            var subResult = getParentByUuid(root[WITH][idx], uuid);
            if (subResult != null)
                return subResult;
        }
    return null;
}

function toCanvasCoords(value) {
    return value * (1 / zoomFactor);
}

function fromCanvasCoords(value) {
    return value * zoomFactor;
}

function getTransform(element) {
    var transform = element.getAttributeNS(null, 'transform');
    var match = /translate\((\d+(.\d+)?), (\d+(.\d+)?)\) scale\((\d+(.\d+)?) (\d+(.\d+)?)\)/gi.exec(transform);
    return {
        'x': parseInt(match[1]),
        'y': parseInt(match[3]),
        'scaleX': parseInt(match[5]),
        'scaleY': parseInt(match[7]),
    };
}

function getElementDimensions(element) {
    var maxWidth = 0;
    var maxHeight = 0;
    var svgs = element.getElementsByTagName('svg');
    for (let i = 0; i < svgs.length; i++) {
        maxWidth = Math.max(maxWidth, svgs[i].width.baseVal.value);
        maxHeight = Math.max(maxHeight, svgs[i].height.baseVal.value);
    }
    return [maxWidth, maxHeight];
}

function getSelectedElements() {
    var selectedElements = [];
    var selectedSigns = outputSvg.getElementsByClassName('selected');
    for (let i = 0; i < selectedSigns.length; i++)
        selectedElements.push(getByUuid(config, selectedSigns[i].getAttributeNS(null, 'uuid')));
    return selectedElements;
}