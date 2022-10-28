function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

function createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function removeUuid(root) {
    if (typeof root != 'object')
        return root;
    if (Array.isArray(root))
        return root.map(item => removeUuid(item));
    var newObj = {};
    for (var key in root) {
        if (key == 'uuid')
            continue;
        newObj[key] = removeUuid(root[key]);
    }
    return newObj;
}

var resCache = {};
function getResource(path) {
    if (path in resCache)
        return resCache[path];

    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();
    resCache[path] = req.responseText;
    return resCache[path];
}

function download(content, type, filename) {
    var dataStr = `data:${type};charset=utf-8,` + encodeURIComponent(content);
    var downloadJsonAnchorNode = document.createElement('a');
    downloadJsonAnchorNode.setAttribute("href", dataStr);
    downloadJsonAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadJsonAnchorNode);
    downloadJsonAnchorNode.click();
    downloadJsonAnchorNode.remove();
}

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