const base64 = require('../scripts/base64');

test('Encode base64', () => {
    expect(
        base64.b64EncodeUnicode('Hello World')
    ).toBe(
        'SGVsbG8gV29ybGQ='
    );
});

test('Decode base64', () => {
    expect(
        base64.b64DecodeUnicode('SGVsbG8gV29ybGQ=')
    ).toBe(
        'Hello World'
    );
});