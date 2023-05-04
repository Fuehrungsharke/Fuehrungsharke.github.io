const staff = require('../scripts/staff');
const stan = require('../stan');

test('Staff --> Text', () => {
    expect(
        staff.toText([1, 71, 232, 304])
    ).toBe(
        '1 / 71 / 232 / 304'
    );
});

test('Text --> Staff', () => {
    expect(
        staff.toStaff('1 / 71 / 232 / 304')
    ).toMatchObject(
        [1, 71, 232, 304]
    );
});

test('Staff + Staff', () => {
    expect(
        staff.sumStaff([3, 4, 1, 2], [5, 2, 3, 4])
    ).toMatchObject(
        [8, 6, 4, 6]
    );
});

test('getStaff: single person', () => {
    expect(
        staff.getStaff({
            'sign': 'Person'
        })
    ).toMatchObject(
        [0, 0, 1, 1]
    );
});

test('getStaff: single formation leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'formation': true
        })
    ).toMatchObject(
        [1, 0, 0, 1]
    );
});

test('getStaff: single brigade leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'brigade': true
        })
    ).toMatchObject(
        [1, 0, 0, 1]
    );
});

test('getStaff: single association leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'association': true
        })
    ).toMatchObject(
        [1, 0, 0, 1]
    );
});

test('getStaff: single platoon leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'platoon': true
        })
    ).toMatchObject(
        [1, 0, 0, 1]
    );
});

test('getStaff: single platoontroop leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'platoontroop': true
        })
    ).toMatchObject(
        [0, 1, 0, 1]
    );
});

test('getStaff: single group leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'group': true
        })
    ).toMatchObject(
        [0, 1, 0, 1]
    );
});

test('getStaff: single echelon leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'echelon': true
        })
    ).toMatchObject(
        [0, 1, 0, 1]
    );
});

test('getStaff: single troop leader', () => {
    expect(
        staff.getStaff({
            'sign': 'Person',
            'troop': true
        })
    ).toMatchObject(
        [0, 1, 0, 1]
    );
});

test('getStaff: TZ-ZTr', () => {
    expect(
        staff.getStaff(stan.StAN_TZ_ZTr)
    ).toMatchObject(
        [1, 1, 2, 4]
    );
});

test('getStaff: TZ-B', () => {
    expect(
        staff.getStaff(stan.StAN_TZ_B)
    ).toMatchObject(
        [0, 2, 7, 9]
    );
});

test('getStaff: TZ-B_ASH', () => {
    expect(
        staff.getStaff(stan.StAN_TZ_B_ASH)
    ).toMatchObject(
        [0, 2, 7, 9]
    );
});

test('getStaff: TZ-N', () => {
    expect(
        staff.getStaff(stan.StAN_TZ_N)
    ).toMatchObject(
        [0, 2, 7, 9]
    );
});