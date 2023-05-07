const canvas_mock = require('./mock/canvas.mock');

describe("canvas tests", () => {
    test('draw single building sign', async () => {
        await canvas_mock.mock();
        const canvas = require('../scripts/canvas');

        await canvas.draw({
            'sign': 'Building',
            'txt': 'OV',
            'colorPrimary': '#039',
            'colorAccent': '#FFF',
            'org': 'THW',
        });

        expect(
            canvas.outputSvg.outerHTML
        ).not.toBeNull();
    });
});