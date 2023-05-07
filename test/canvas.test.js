const canvas = require('../scripts/canvas');
const resource_manager_mock = require('./mock/resource_manager.mock');

describe("canvas tests", () => {
    resource_manager_mock.mock();

    // test('draw single building sign', async () => {
    //     await canvas.draw({
    //         'sign': 'Building',
    //         'txt': 'OV',
    //         'colorPrimary': '#039',
    //         'colorAccent': '#FFF',
    //         'org': 'THW',
    //     });

    //     expect(
    //         canvas.outputSvg
    //     ).toBe(
    //         'the expected value'
    //     );
    // });
});