const staff = require('../scripts/staff');

test('Staff --> Text', () => {
    expect(staff.toText([1, 71, 232, 304])).toBe('1 / 71 / 232 / 304');
});