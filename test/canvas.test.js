const canvas_mock = require('./mock/canvas.mock');
const m_svg2png = require('convert-svg-to-png');

describe("canvas tests", () => {
    test('draw single building sign', async () => {
        await canvas_mock.mock();
        const canvas = require('../scripts/canvas');
        const m_resource_manager = require('../scripts/resource_manager');
        
        let svgExpected = m_resource_manager.getResourceAsync('/test/expected/Building.svg');

        await canvas.draw({
            'sign': 'Building',
            'colorPrimary': '#039',
            'colorAccent': '#FFF',
            'org': 'THW',
        });

        expect(
            await m_svg2png.convert(canvas.outputSvg.outerHTML)
        ).toMatchObject(
            await m_svg2png.convert(await svgExpected)
        );
    });
});