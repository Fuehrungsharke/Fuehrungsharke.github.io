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
    }
};

AddCmd.prototype.getNewSign = function (sourceSign, key) {
    var newObj = {
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

AddCmd.prototype.insertParent = function (root, newObj) {
    if (this.parentLayer != null) {
        if (Array.isArray(this.parentLayer) && this.parentLayer.length > 0) {
            newObj[SUB] = this.parentLayer;
            config = newObj;
        }
        else if (this.parentLayer[SUB] != null) {
            if (this.parentLayer == this.parentLogical) {
                this.parentLayer[SUB] = this.parentLayer[SUB].filter(item => item != root);
                newObj[SUB] = [root];
            } else {
                this.parentLayer[SUB] = this.parentLayer[SUB].filter(item => item != this.parentLogical);
                newObj[SUB] = [this.parentLogical];
            }
            this.parentLayer[SUB].push(newObj);
        }
    }
    else {
        newObj[SUB] = [config];
        config = newObj;
    }
}

AddCmd.prototype.insertSibling = function (newObj) {
    if (this.parentLayer != null) {
        if (Array.isArray(this.parentLayer) && this.parentLayer.length > 0)
            this.parentLayer.push(newObj);
        else if (this.parentLayer[SUB] != null)
            this.parentLayer[SUB].push(newObj);
    } else
        config = [config, newObj];
}

AddCmd.prototype.insertSub = function (root, newObj) {
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
}

AddCmd.prototype.insertWith = function (root, newObj) {
    if (this.parentLogical != null && this.parentLogical[WITH] != null && this.parentLogical[WITH].indexOf(root) >= 0)
        this.parentLogical[WITH].push(newObj);
    else {
        if (root[WITH] == null)
            root[WITH] = [];
        root[WITH].push(newObj);
    }
}