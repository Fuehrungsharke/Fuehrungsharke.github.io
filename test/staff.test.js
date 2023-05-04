const staff = require('../scripts/staff');

test('Staff --> Text', () => {
    expect(
        staff.toText([1, 71, 232, 304])
    ).toBe(
        '1 / 71 / 232 / 304'
    );
});

test('Text --> Staff', () => {
    expect(
        staff.toStaff('1 / 71 / 232 / 304').toString()
    ).toBe(
        [1, 71, 232, 304].toString()
    );
});

test('Staff + Staff', () => {
    expect(
        staff.sumStaff([3, 4, 1, 2], [5, 2, 3, 4]).toString()
    ).toBe(
        [8, 6, 4, 6].toString()
    );
});

test('getStaff: single person', () => {
    expect(
        staff.getStaff({
            'sign': 'Person'
        }).toString()
    ).toBe(
        [0, 0, 1, 1].toString()
    );
});

test('getStaff: single formation leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'formation': true
        }).toString()
    ).toBe(
        [1, 0, 0, 1].toString()
    );
});

test('getStaff: single brigade leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'brigade': true
        }).toString()
    ).toBe(
        [1, 0, 0, 1].toString()
    );
});

test('getStaff: single association leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'association': true
        }).toString()
    ).toBe(
        [1, 0, 0, 1].toString()
    );
});

test('getStaff: single platoon leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'platoon': true
        }).toString()
    ).toBe(
        [1, 0, 0, 1].toString()
    );
});

test('getStaff: single platoontroop leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'platoontroop': true
        }).toString()
    ).toBe(
        [0, 1, 0, 1].toString()
    );
});

test('getStaff: single group leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'group': true
        }).toString()
    ).toBe(
        [0, 1, 0, 1].toString()
    );
});

test('getStaff: single echelon leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'echelon': true
        }).toString()
    ).toBe(
        [0, 1, 0, 1].toString()
    );
});

test('getStaff: single troop leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'troop': true
        }).toString()
    ).toBe(
        [0, 1, 0, 1].toString()
    );
});