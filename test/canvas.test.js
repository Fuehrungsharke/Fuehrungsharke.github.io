const canvas = require('../scripts/canvas');

test('the data is peanut butter', async () => {
    await canvas.draw({
        'sign': 'Building',
        'txt': 'OV',
        'colorPrimary': '#039',
        'colorAccent': '#FFF',
        'org': 'THW',
    });
    expect('AAA').toBe('AAA');
});

test('draw #1', async () => {
    await canvas.draw({
        'sign': 'Building',
        'txt': 'OV',
        'colorPrimary': '#039',
        'colorAccent': '#FFF',
        'org': 'THW',
    });

    expect(
        canvas.outputSvg
    ).toBe(
        'the expected value'
    );
});