function createUUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
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
    let newObj = {};
    for (let key in root) {
        if (key == 'uuid')
            continue;
        newObj[key] = removeUuid(root[key]);
    }
    return newObj;
}