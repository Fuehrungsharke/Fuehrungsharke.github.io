const uuid = require('../scripts/uuid');

test('New random UUID', () => {
    expect(
        uuid.createUUID()
    ).toMatch(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    );
});

test('Remove UUID', () => {
    expect(
        uuid.removeUuid([
            {
                'name': 'obj1',
                'uuid': uuid.createUUID(),
            },
            {
                'name': 'obj2',
                'uuid': uuid.createUUID(),
            },
        ])
    ).toMatchObject(
        [
            {
                'name': 'obj1',
            },
            {
                'name': 'obj2',
            },
        ]
    );
});