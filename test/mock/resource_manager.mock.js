const resource_manager = require('../../scripts/resource_manager');
const fs = require("fs");
const path = require("path");

function mock() {
    resource_manager.getResourceAsync = p => {
        if (p in resource_manager.resCache)
            return resource_manager.resCache[p];
        const file = path.join(__dirname, "../../", p);
        resource_manager.resCache[p] = new Promise((resolve, reject) => {
            fs.readFile(file, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
        return resource_manager.resCache[p];
    };
}

module.exports = { mock };