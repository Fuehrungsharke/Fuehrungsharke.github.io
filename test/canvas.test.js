const canvas_mock = require('./mock/canvas.mock');
const m_svg2png = require('convert-svg-to-png');
const fs = require('fs');
const path = require('path');

let configs = fs.readdirSync(path.join(__dirname, '../', '/test/configs/'));

describe("canvas tests", () => {
    test.each(configs
        .map(c => [c, c.replace('.json', '.svg')])
    )('draw %s', async (configFile, expectedFile) => {
        await canvas_mock.mock();
        const canvas = require('../scripts/canvas');
        const m_resource_manager = require('../scripts/resource_manager');

        let svgExpected = m_resource_manager.getResourceAsync(`/test/expected/${expectedFile}`);
        let jsonConfig = m_resource_manager.getResourceAsync(`/test/configs/${configFile}`);

        await canvas.draw(JSON.parse(await jsonConfig));

        expect(
            await m_svg2png.convert(canvas.outputSvg.outerHTML)
        ).toMatchObject(
            await m_svg2png.convert(await svgExpected)
        );
    });
});