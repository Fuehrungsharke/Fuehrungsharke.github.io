var ZTr = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoontroop": true,
    "with": [
        {
            "name": "Der Zugtruppführer",
            "sign": "Person",
            "txt": "TZ",
            "leading": true,
            "platoontroop": true,
        }
    ],
    "sub": [
        {
            "name": "ZTr-Helfer 1",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 2",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 3",
            "sign": "Person",
            "txt": "ZTr",
        },
        {
            "name": "ZTr-Helfer 4",
            "sign": "Person",
            "txt": "ZTr",
        }
    ]
};

var BGr = {
    "sign": "Unit",
    "txt": "B",
    "org": "THW",
    "group": true,
    "with": [
        {
            "txt": "B",
            "name": "Der Gruppenführer, der Bergung",
            "sign": "Person",
            "leading": true,
            "group": true,
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Bergung",
            "sign": "Person",
            "txt": "B",
            "leading": true,
            "troop": true,
            "sub": null,
        },
        {
            "name": "B-Helfer 1",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 2",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 3",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 4",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 5",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 6",
            "sign": "Person",
            "txt": "B",
        },
        {
            "name": "B-Helfer 7",
            "sign": "Person",
            "txt": "B",
        },
    ]
};

var FGrN = {
    "sign": "Unit",
    "txt": "N",
    "org": "THW",
    "group": true,
    "with": [
        {
            "name": "Der Gruppenführer, der Notversorgung, und Notinstandsetzung",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "group": true,
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Notversorgung, und Notinstandsetzung",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "troop": true,
        },
        {
            "name": "N-Helfer 1",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 2",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 3",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 4",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 5",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 6",
            "sign": "Person",
            "txt": "N",
        },
        {
            "name": "N-Helfer 7",
            "sign": "Person",
            "txt": "N",
        },
    ]
};

var TZ = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "with": [
        {
            "sign": "Person",
            "name": "Der Zugführer",
            "txt": "TZ",
            "leading": true,
            "platoon": true,
        }
    ],
    "sub": [
        ZTr,
        BGr,
        FGrN,
    ],
};

var config = TZ;