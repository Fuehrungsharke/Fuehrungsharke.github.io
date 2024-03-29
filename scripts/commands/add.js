function AddCmd() { }

AddCmd.prototype.__proto__ = new CmdBase();

AddCmd.prototype.presets = {
    "Unit": {
        "show_staff": true
    },
    "Flag": {
        "colorPrimary": "#FF0",
        "colorAccent": "#000"
    },
    "Vehicle": {
        "automotive": true
    },
    "Hazard": {
        "colorAccent": "#F00"
    },
    "Empty": {
        "colorAccent": "#000"
    },
};

AddCmd.prototype.getNewSign = function (sourceSign, key) {
    let newObj = {
        'sign': key,
        'colorPrimary': '#FFF',
        'colorAccent': '#000'
    };
    if (sourceSign.org != null)
        newObj.org = sourceSign.org;
    if (sourceSign.colorPrimary != null)
        newObj.colorPrimary = sourceSign.colorPrimary;
    if (sourceSign.colorAccent != null)
        newObj.colorAccent = sourceSign.colorAccent;
    if (key in this.presets)
        for (let idx in this.presets[key])
            newObj[idx] = this.presets[key][idx];
    return newObj;
}

AddCmd.prototype.cloneCachedElements = function () {
    return JSON.parse(JSON.stringify(cachedElements));
}

AddCmd.prototype.getParentLayer = function (root) {
    let parentLogical = getParentByUuid(config, root.uuid);
    let parentLayer = parentLogical;
    if (parentLayer != null && parentLayer.hasOwnProperty(WITH) && Array.isArray(parentLayer[WITH])) {
        for (let idx in parentLayer[WITH])
            if (parentLayer[WITH][idx].hasOwnProperty('uuid') && parentLayer[WITH][idx].uuid == root.uuid) {
                parentLayer = getParentByUuid(config, parentLayer.uuid);
                break;
            }
    }
    return parentLayer;
}

AddCmd.prototype.insertParent = function (root, newObj) {
    if (newObj?.sign == null)
        return false;
    let parentLogical = getParentByUuid(config, root.uuid);
    let parentLayer = this.getParentLayer(root);
    if (parentLayer != null) {
        if (Array.isArray(parentLayer) && parentLayer.length > 0) {
            newObj[SUB] = parentLayer;
            config = newObj;
        }
        else if (parentLayer[SUB] != null) {
            let oldObj = null;
            if (parentLayer == parentLogical)
                oldObj = root;
            else
                oldObj = parentLogical;
            let idx = parentLayer[SUB].indexOf(root);
            newObj[SUB] = [oldObj];
            parentLayer[SUB][idx] = newObj;
        }
    }
    else {
        newObj[SUB] = [config];
        config = newObj;
    }
    return true;
}

AddCmd.prototype.insertSibling = function (root, newObj) {
    if (newObj?.sign == null)
        return false;
    let parentLayer = this.getParentLayer(root);
    if (parentLayer != null) {
        if (Array.isArray(parentLayer) && parentLayer.length > 0)
            parentLayer.push(newObj);
        else if (parentLayer.sub != null)
            parentLayer.sub.push(newObj);
    } else
        config = [config, newObj];
    return true;
}

AddCmd.prototype.insertSub = function (root, newObj) {
    if (newObj?.sign == null)
        return false;
    if (this.parentLogical != null && this.parentLogical[WITH] != null && this.parentLogical[WITH].indexOf(root) >= 0) {
        if (this.parentLogical[SUB] == null)
            this.parentLogical[SUB] = [];
        this.parentLogical[SUB].push(newObj);
    }
    else {
        if (root[SUB] == null)
            root[SUB] = [];
        root[SUB].push(newObj);
    }
    return true;
}

AddCmd.prototype.insertWith = function (root, newObj) {
    if (newObj?.sign == null)
        return false;
    if (this.parentLogical != null && this.parentLogical[WITH] != null && this.parentLogical[WITH].indexOf(root) >= 0)
        this.parentLogical[WITH].push(newObj);
    else {
        if (root[WITH] == null)
            root[WITH] = [];
        root[WITH].push(newObj);
    }
    return true;
}