const resource_manager = require('../scripts/resource_manager');
const resource_manager_mock = require('./mock/resource_manager.mock');
const fs = require("fs");
const path = require("path");

describe("resource_manager tests", () => {
    const bike = '/signs/Bike.svg';
    const bikeFile = path.join(__dirname, "../", bike);
    let promiseBike = new Promise((resolve, reject) => {
        fs.readFile(bikeFile, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });

    test('get cached value', async () => {
        const expected = 'some cached value';
        resource_manager.resCache['example'] = expected;
        const resValue = await resource_manager.getResourceAsync('example');
        expect(resValue).toBe(expected);
    });

    test('get uncached public resource', async () => {
        const bikeSign = await resource_manager.getResourceAsync(path.join('https://fuehrungsharke.github.io/', bike));
        expect(bikeSign).toBe(await promiseBike);
    });

    test('get uncached resource with mocked resource_manager', async () => {
        resource_manager_mock.mock();
        const bikeSign = await resource_manager.getResourceAsync(bike);
        expect(bikeSign).toBe(await promiseBike);
    });
});