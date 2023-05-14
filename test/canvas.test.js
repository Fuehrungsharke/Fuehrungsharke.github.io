const canvas_mock = require('./mock/canvas.mock');
const m_svg2png = require('convert-svg-to-png');
const fs = require('fs');
const path = require('path');

let pngPath = null;
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

        let pngExpected = m_svg2png.convert(await svgExpected);
        let pngAcutal = m_svg2png.convert(canvas.outputSvg.outerHTML);

        if (fs.existsSync(pngPath)) {
            let name = configFile.replace('.json', '');
            let errAction = err => {
                if (err)
                    return console.log(err);
            };
            await fs.writeFile(path.join(pngPath, `${name}_expected.png`), await pngExpected, errAction);
            await fs.writeFile(path.join(pngPath, `${name}_actual.png`), await pngAcutal, errAction);
        }

        expect(
            await pngAcutal
        ).toMatchObject(
            await pngExpected
        );
    });
});