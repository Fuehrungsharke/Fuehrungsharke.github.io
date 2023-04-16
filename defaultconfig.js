let ZTr = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "row-right",
    "with": [
        {
            "sign": "Person",
            "name": "Der Zugführer",
            "txt": "TZ",
            "leading": true,
            "platoon": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        }
    ],
    "sub": [
        {
            "name": "Der Zugtruppführer",
            "sign": "Person",
            "txt": "TZ",
            "leading": true,
            "platoontroop": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "ZTr-Helfer 1",
            "sign": "Person",
            "txt": "ZTr",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "ZTr-Helfer 2",
            "sign": "Person",
            "txt": "ZTr",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        }
    ]
};

let BGr = {
    "sign": "Unit",
    "txt": "B",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "row-right",
    "with": [
        {
            "txt": "B",
            "name": "Der Gruppenführer, der Bergung",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Bergung",
            "sign": "Person",
            "txt": "B",
            "leading": true,
            "troop": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 1",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 2",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 3",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 4",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 5",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 6",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "B-Helfer 7",
            "sign": "Person",
            "txt": "B",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
    ]
};

let FGrR = {
    "sign": "Unit",
    "txt": "R",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "row-right",
    "with": [
        {
            "name": "Der Gruppenführer, der Fachgruppe, Räumen",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        }
    ],
    "sub": [
        {
            "name": "Der Truppführer, der Fachgruppe, Räumen",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "troop": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 1",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 2",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 3",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 4",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 5",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 6",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
        {
            "name": "R-Helfer 7",
            "sign": "Person",
            "txt": "R",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
        },
    ]
};

let TZ = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
    "sub": [
        ZTr,
        BGr,
        FGrR,
    ],
};

let EAL_West = {
    "sign": "Flag",
    "colorPrimary": "#FF0",
    "colorAccent": "#000",
    "layout": "list-right",
    "txt": "EAL",
    "name": "West",
    "with": [
        {
            "sign": "Measure",
            "symbols:extinguish": true,
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        }
    ],
    "sub": [
        {
            "sign": "Unit",
            "colorPrimary": "#F00",
            "colorAccent": "#FFF",
            "layout": "list-right",
            "symbols:extinguish": true,
            "platoon": true
        }
    ]
}

let EAL_East = {
    "sign": "Flag",
    "colorPrimary": "#FF0",
    "colorAccent": "#000",
    "layout": "list-right",
    "txt": "EAL",
    "name": "Ost",
    "with": [
        {
            "sign": "Measure",
            "symbols:clear": true,
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        }
    ],
    "sub": [
        TZ
    ]
}

let BR_ZTr = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "staff": [1, 1, 2, 4],
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF"
};

let BR_Log = {
    "sign": "Place",
    "symbols:consumable": true,
    "colorPrimary": "#FF0",
    "colorAccent": "#000",
    "layout": "list-right",
    "support": true,
    "sub": [
        {
            "sign": "Unit",
            "txt": "Log-VG",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "troop": true,
            "layout": "list-right",
            "support": true,
            "show_staff": true,
            "staff": [0, 1, 5, 6]
        }
    ]
}

let BR_FGrN = {
    "sign": "Unit",
    "txt": "N",
    "org": "THW",
    "group": true,
    "layout": "list-right",
    "show_staff": true,
    "staff": [0, 2, 7, 9],
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF"
};

let BR_FGrE = {
    "sign": "Unit",
    "txt": "E",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "layout": "list-right",
    "group": true,
    "org": "THW",
    "with": [
        {
            "sign": "Vehicle",
            "txt": "Lbw",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true
        },
        {
            "sign": "Vehicle",
            "txt": "NEA",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "trailer": true
        }
    ]
};

let EAL_BR = {
    "sign": "Flag",
    "colorPrimary": "#FF0",
    "colorAccent": "#000",
    "txt": "EAL",
    "name": "BR",
    "layout": "list-right-below",
    "with": [
        BR_ZTr
    ],
    "sub": [
        BR_Log,
        BR_FGrN,
        BR_FGrE
    ]
}

let EL = {
    "sign": "Flag",
    "colorPrimary": "#FF0",
    "colorAccent": "#000",
    "layout": "list-right",
    "txt": "EL",
    "sub": [
        EAL_West,
        EAL_East,
        EAL_BR
    ],
    "with": [
        {
            "sign": "Place",
            "txt": "LSt",
            "name": "Musterstadt",
            "colorPrimary": "#F00",
            "colorAccent": "#FFF",
            "stationary": true,
            "leading": true
        }
    ]
}

let config = [
    EL
];

// let Layout = {
//     ListRight: "list-right",
//     ListRightBelow: "list-right-below",
//     RowRight: "row-right",
//     RowRightBelow: "row-right-below",
//     CenteredRight: "center-right",
//     CenteredBelow: "center-below",
// }

config = {
    "name": "Root 1",
    "sign": "Flag",
    "txt": "R",
    "colorPrimary": "#FFF",
    "colorAccent": "#000",
    "layout": "center-right",
    "with": [
        {
            "sign": "Building",
            "txt": "W",
            "name": "With 1",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
        {
            "sign": "Unit",
            "txt": "W",
            "name": "With, 2",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
        {
            "sign": "Vehicle",
            "txt": "W",
            "name": "With 3",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
    ],
    "sub": [
        {
            "sign": "Building",
            "txt": "S",
            "name": "Sub 1",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
        {
            "sign": "Unit",
            "txt": "S",
            "name": "Sub, 2",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
        {
            "sign": "Place",
            "txt": "S",
            "name": "Sub 3",
            "colorPrimary": "#FFF",
            "colorAccent": "#000",
        },
    ],
};