const canvas = require('../scripts/canvas');

module.exports = {
    BaseTest: function () {
        return 'BaseTest';
    },

    WipTest: function () {
        canvas.draw();
        return canvas.outputSvg;
    },
}

require('make-runnable');