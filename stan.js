let StAN_OV_Stab = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "OV Stab",
    "leading": true,
    "show_staff": true,
    "UnitPattern": "OV\\-Stab",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "stv OB",
            "leading": true,
            "leader": true,
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "AB",
                    "subleader": true,
                    "FuncPattern": "Ausbildungsbeauftragte\/r"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "OJB",
                    "subleader": true,
                    "FuncPattern": "Ortsjugendbeauftragte\/r"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "stv OJB",
                    "FuncPattern": "stv\\. Ortsjugendbeauftragte\/r"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "SM",
                    "FuncPattern": "Schirrmeister\/in"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "BÖH",
                    "FuncPattern": "Beauftragte\/r für Öffentlichkeitsarbeit"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "Vw",
                    "FuncPattern": "Verwaltungsbeauftragte\/r"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "Ko",
                    "FuncPattern": "OV\-Koch\/Köchin"
                }
            ],
            "layout": "row-right",
            "FuncPattern": "stv\\. Ortsbeauftragte\/r"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW",
            "name": "Mannschafts-, transportwagen",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "0,5t",
                    "name": "Anhänger, 0,5 t Nutzlast, (Ergänzungsausstattung)",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "PKW",
            "name": "Personenkraftwagen OV, (Ergänzungsausstattung)"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler",
            "name": "Gabelstapler, (Ergänzungsausstattung)"
        }
    ]
};

let StAN_TZ_ZTr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "TZ",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "(\\d+)\\. TZ\/ZTr TZ",
    "sub": [
        {
            "sign": "Person",
            "txt": "TZ",
            "leading": true,
            "platoon": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "TZ",
                    "leading": true,
                    "platoontroop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Zugtruppführer\/in"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Zugführer\/in"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FüKW",
            "name": "Führungskraftwagen"
        }
    ]
};

let StAN_TZ_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "B",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "(\\d+)\\. TZ\/B",
    "sub": [
        {
            "txt": "B",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "B",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Truppführer\/in Bergung"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Gruppenführer\/in"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "GKW",
            "name": "Gerätekraftwagen, (7 t Nutzlast)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "7t",
                    "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_B_ASH = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "B",
    "spez": "ASH",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "layout": "list-right",
    "sub": [
        {
            "txt": "B",
            "name": "",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "B",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "GKW",
            "name": "Gerätekraftwagen, (7 t Nutzlast)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "7t",
                    "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Ru 12t",
                    "name": "Anhänger Plattform, Runge, (12 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_N = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "N",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "(\\d+)\\. TZ\/FGr N",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "N",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Truppführer\/in Notversorgung und Notinstandsetzung"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Gruppenführer\/in Notversorgung u Notinstandsetzung"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "name": "Mehrzweck-, gerätewagen, Plane/Spriegel, mit Ladebordwand",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "NEA 50kVA LiMa",
                    "name": "Anhänger, Netzersatzanlage, mit Lichtmastanlage, (50 – 75 kVA)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "kl Boot",
                    "name": "Anhänger, kleines Boot",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "kl Boot",
                            "name": "Kleines Boot"
                        }
                    ]
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler 3t",
            "name": "Gabelstapler, (mind. 3 t Hubkraft)"
        }
    ]
};

let StAN_TZ_R_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "R",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr R \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Truppführer\/in Räumen"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Gruppenführer\/in Räumen"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "name": "Lastkraftwagen, Kipper, (ca. 9 t Zuladung)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "name": "Anhänger Tieflader, mit Aufnahmen, für Container, (18 t Zuladung)",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Bagger",
                            "name": "Baumaschine, Radbagger",
                            "with": [
                                {
                                    'sign': 'Empty',
                                    'txt': 'oder'
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#039",
                                    "colorAccent": "#FFF",
                                    "org": "THW",
                                    "txt": "Bagger",
                                    "chain": true,
                                    "name": "Baumaschine, Kettenbagger"
                                }
                            ]
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE",
                    "name": "Anhänger, Drucklufterzeuger"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Geräte-Container (FB)",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Material-Container (FB)",
                    "org": "THW"
                }
            ]
        }
    ]
};

let StAN_TZ_R_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "R",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr R \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "name": "Lastkraftwagen, Kipper, (ca. 9 t Zuladung)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "name": "Anhänger Tieflader, mit Aufnahmen, für Container, (18 t Zuladung)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Radlader",
                            "name": "Baumaschine, Radlader"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE",
                    "name": "Anhänger, Drucklufterzeuger"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Geräte-Container (FB)",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Material-Container (FB)",
                    "org": "THW"
                }
            ]
        }
    ]
};

let StAN_TZ_R_C = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "R",
    "spez": "C",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr R \\(C\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "name": "Lastkraftwagen, Kipper, (ca. 9 t Zuladung)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "name": "Anhänger Tieflader, mit Aufnahmen, für Container, (18 t Zuladung)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Telelader",
                            "name": "Baumaschine, Teleskoplader"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE",
                    "name": "Anhänger, Drucklufterzeuger"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Geräte-Container (FB)",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "swapbody": true,
                    "name": "Material-Container (FB)",
                    "org": "THW"
                }
            ]
        }
    ]
};

let StAN_TZ_W_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "W",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr W \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "W",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 7t",
            "name": "Lastkraftwagen (7t Nutzlast), mit Ladekran (270 kNm), (geländefähig)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "MzAB",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzAB",
                            "name": "Mehrzweck-, arbeitsboot"
                        }
                    ],
                    "name": "Anhänger, Mehrzweck-, arbeitsboot"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "MzAB",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzAB",
                            "name": "Mehrzweck-, arbeitsboot"
                        }
                    ],
                    "name": "Anhänger, Mehrzweck-, arbeitsboot"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "swapbody": true,
            "name": "Material-Container",
            "org": "THW"
        }
    ]
};

let StAN_TZ_W_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "W",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr W \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "W",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 7t",
            "name": "Lastkraftwagen (7t Nutzlast), mit Ladekran (270 kNm), (geländefähig)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                    "sub": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        }
                    ],
                    "layout": "row-right"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "swapbody": true,
            "name": "Material-Container",
            "org": "THW"
        }
    ]
};

let StAN_TZ_BrB = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "BrB",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr BrB",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "BrB",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "name": "Mehrzweckgerätewagen, mit Ladebordwand"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 1,5t",
            "name": "Lastkraftwagen, (1,5 t Nutzlast), mit Ladekran, (780 kNm)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_O_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "O",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr O \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "O (A) 2t",
                    "name": "Anhänger, mit Spezialaufbau, FGr O, (2 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_O_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "O",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr O \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "O (B) 2t",
                    "name": "Anhänger, mit Spezialaufbau, FGr O, (2 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_O_C = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "O",
    "spez": "C",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr O \\(C\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ"
        }
    ]
};

let StAN_TZ_Sp = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "Sp",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr Sp",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "Sp",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Sp",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Sp 2t",
                    "name": "Anhänger, mit Spezialaufbau, FGr Sp, (2 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ_SB_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "SB",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr SB \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "SB",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "name": "Mehrzweckgerätewagen, Plane/Spriegel, mit Ladebordwand"
        }
    ]
};

let StAN_TZ_SB_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "SB",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr SB \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "SB",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "name": "Mehrzweck-, gerätewagen, Plane/Spriegel, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "ERS",
            "name": "Rettungsspinne"
        }
    ]
};

let StAN_TZ_BT = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "BT",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr BT",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "BT",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "BT",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "BT 2t",
                    "name": "Anhänger"
                }
            ]
        }
    ]
};

let StAN_TZ_I = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "I",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr I",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "I",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "I",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "I",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "I 2t",
                    "name": "Anhänger, mit Spezialaufbau, für FGr I, (2 t Nutzlast)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_E = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "E",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr E",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "E",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "E",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "NEA 200 kVA",
                    "name": "Anhänger, Netzersatzanlage, (ca. 200 kVA)",
                    "trailer": true
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "NEA 650 kVA",
                    "name": "Anhänger, Netzersatzanlage, (ca. 650 kVA)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_TW = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "TW",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr TW",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "TW",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "TW",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "TW",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "TWAA",
                    "name": "Anhänger, Trinkwasser-, aufbereitungs-, anlage",
                    "trailer": true
                },
                {
                    "sign": "Equipment",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "TWAA, 15m³/h",
                    "name": "Trinkwasser-, aufbereitungs-, anlage, (15 m³/h)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "BDF Lafette",
                    "name": "Anhänger, BDF Lafette",
                    "trailer": true,
                    "swapable": true,
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "swapbody": true,
                            "txt": "TW-Labor",
                            "name": "Trinkwasserlabor-, Container"
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "swapbody": true,
                            "txt": "TW-Tank",
                            "name": "Tankcontainer, für Trinkwasser"
                        }
                    ]
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler 2t",
            "name": "Stapler, (2 t Hubkraft,, geländefähig)"
        }
    ]
};

let StAN_TZ_WP_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "WP",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr WP \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "WP",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "SwPu, 5.000 l/min",
                    "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (5.000 l/min)",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "7t",
                    "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_WP_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "WP",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr WP \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "WP",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "SwPu, 15.000 l/min",
                    "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (15.000 l/min)",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "7t",
                    "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_WP_C = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "WP",
    "spez": "C",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr WP \\(C\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "WP",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw 7t",
            "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "SwPu, 25.000 l/min",
                    "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (25.000 l/min)",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "7t",
                    "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_OEL_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "Öl",
    "spez": "A",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr Öl \\(A\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "Öl",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "swapable": true,
            "txt": "LKW",
            "name": "Lastkraftwagen, Wechsellader",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "name": "Materialcontainer",
                    "swapbody": true
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "name": "Abrollbehälter, Separationsanlage, (160 m³/h)",
                    "swapbody": true,
                    "txt": "SepCon, 160 m³/h"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 7t",
            "name": "Lastkraftwagen, (7 t Nutzlast), mit Ladekran, (410 kNm)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_OEL_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "Öl",
    "spez": "B",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr Öl \\(B\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "Öl",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "swapable": true,
            "txt": "LKW",
            "name": "Lastkraftwagen, Wechsellader",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "name": "Materialcontainer",
                    "swapbody": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 9t",
            "name": "Lastkraftwagen, (9 t Nutzlast), mit Ladekran, (180 kNm)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                    "trailer": true
                }
            ]
        }
    ]
};

let StAN_TZ_OEL_C = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "Öl",
    "spez": "C",
    "group": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/FGr Öl \\(C\\)",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "Öl",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "swapable": true,
            "txt": "LKW",
            "name": "Lastkraftwagen, Wechsellader",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                    "trailer": true,
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "name": "Materialcontainer",
                            "swapbody": true
                        }
                    ]
                }
            ],
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "name": "Abrollbehälter, Separationsanlage, (40 m³/h)",
                    "swapbody": true,
                    "txt": "SepCon, 40 m³/h"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler 3t",
            "name": "Stapler, (3 t Hubkraft,, geländefähig)"
        }
    ]
};

let StAN_TZ_ESS = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "ESS",
    "troop": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/Tr ESS",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "ESS",
            "leading": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "troop": true
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ"
        }
    ]
};

let StAN_TZ_MHP = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "MHP",
    "troop": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/Tr MHP",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "MHP",
            "leading": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "troop": true
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "MTW",
            "name": "Mannschafts-, transportwagen, (geländegängig)",
            "offroad": true,
            "automotive": true
        }
    ]
};

let StAN_TZ_UL = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "UL",
    "troop": true,
    "show_staff": true,
    "UnitPattern": "(\\d+)\\. TZ\/Tr UL",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "UL",
            "leading": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "troop": true
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ"
        }
    ]
};

let StAN_TZ = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "(\\d+)\\. TZ\/.*",
    "sub": [
        StAN_TZ_ZTr,
        StAN_TZ_B,
        StAN_TZ_B_ASH,
        StAN_TZ_N,
        StAN_TZ_R_A,
        StAN_TZ_R_B,
        StAN_TZ_R_C,
        StAN_TZ_W_A,
        StAN_TZ_W_B,
        StAN_TZ_BrB,
        StAN_TZ_O_A,
        StAN_TZ_O_B,
        StAN_TZ_O_C,
        StAN_TZ_Sp,
        StAN_TZ_SB_A,
        StAN_TZ_SB_B,
        StAN_TZ_BT,
        StAN_TZ_I,
        StAN_TZ_E,
        StAN_TZ_TW,
        StAN_TZ_WP_A,
        StAN_TZ_WP_B,
        StAN_TZ_WP_C,
        StAN_TZ_OEL_A,
        StAN_TZ_OEL_B,
        StAN_TZ_OEL_C,
        StAN_TZ_ESS,
        StAN_TZ_MHP,
        StAN_TZ_UL
    ]
};

let StAN_TZ_FGr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "(\\d+)\\. TZ\/.*",
    "sub": [
        StAN_TZ_ZTr,
        StAN_TZ_B,
        StAN_TZ_N,
        StAN_TZ_R_A,
    ]
};

let StAN_Log_ZTr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "FZ Log",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ Log\/ZTr FZ Log",
    "sub": [
        {
            "sign": "Person",
            "txt": "Log",
            "leading": true,
            "platoon": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Log",
                    "leading": true,
                    "platoontroop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Zugtruppführer\/in Fachzug Logistik"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Zugführer\/in Fachzug Logistik"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FüKW",
            "name": "Führungskraftwagen"
        }
    ]
};

let StAN_Log_V = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Log-V",
    "org": "THW",
    "group": true,
    "support": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ Log\/FGr Log\-V",
    "sub": [
        {
            "txt": "Log-V",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "txt": "Log-V",
                    "sign": "Person",
                    "leading": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "troop": true,
                    "org": "THW",
                    "FuncPattern": "Truppführer\/in Logistik\-Verpflegung"
                },
                {
                    "txt": "Log-V",
                    "sign": "Person",
                    "leading": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "troop": true,
                    "org": "THW",
                    "FuncPattern": "Truppführer\/in Logistik\-Verpflegung"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Gruppenführer\/in Logistik\-Verpflegung"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lbw",
            "name": "Lastkraftwagen, mit Ladebordwand",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "12t",
                    "name": "Anhänger 12t,, Koffer,, ohne Flurförderzeug, be- und entladbar"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Kühl",
                    "name": "Anhänger, mit Spezialaufbau, für FGr Log-V,, Kühl"
                }
            ]
        }
    ]
};

let StAN_Log_M = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Log-M",
    "org": "THW",
    "troop": true,
    "support": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ Log\/FGr Log\-MW",
    "sub": [
        {
            "txt": "Log-M",
            "sign": "Person",
            "leading": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "troop": true,
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Truppführer\/in Logistik\-Materialwirtschaft",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "LKW-Lkr",
            "name": "LKW (gf),, Ladekran, (9 t Zuladung,, Hublast 0,6 t, in 10 m Entfernung, zum Kranfahrzeug)",
            "offroad": true,
            "automotive": true,
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF",
                    "name": "Anhänger Plattform",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#039",
                            "colorAccent": "#FFF",
                            "org": "THW",
                            "swapbody": true,
                            "txt": "Wks",
                            "name": "Werkstatt-, container"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "2t",
                    "name": "Anhänger, mit Spezialaufbau, für FGr Log-MW, (2 t Nutzlast)",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "offroad": true,
            "automotive": true,
            "txt": "PKW",
            "name": "PKW (gl)"
        }
    ]
};

let StAN_Log_VG = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Log-VG",
    "org": "THW",
    "troop": true,
    "support": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ Log\/FGr Log\-MW",
    "sub": [
        {
            "txt": "Log-VG",
            "sign": "Person",
            "leading": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "troop": true,
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Truppführer\/in Logistik\-Materialwirtschaft",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "MLW IV",
            "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
            "offroad": true,
            "automotive": true,
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "5t",
                    "name": "Anh. Tandem, (5 t Zuladung)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler 3t",
            "name": "Gabelstapler"
        }
    ]
};

let StAN_Log_MW = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Log-MW",
    "org": "THW",
    "group": true,
    "support": true,
    "show_staff": true,
    "layout": "list-right-below",
    "UnitPattern": "FZ Log\/FGr Log\-MW",
    "with": [
        {
            "txt": "Log-MW",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "FuncPattern": "Gruppenführer\/in Logistik\-Materialwirtschaft"
        }
    ],
    "sub": [
        StAN_Log_M,
        StAN_Log_VG
    ]
};

let StAN_Log_TS = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "TS",
    "org": "THW",
    "troop": true,
    "support": true,
    "show_staff": true,
    "UnitPattern": "FZ Log\/Tr TS",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "TS",
            "troop": true,
            "leading": true,
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "SZM",
            "name": "Sattelzugmaschine, (zugelassen, für Gefahrgut)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Aufl",
                    "name": "Auflieger Container"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Aufl Pr-Lbw",
                    "name": "Auflieger Pritsche, Plane/Spriegel, mit Ladebordwand"
                }
            ]
        }
    ]
};

let StAN_Log = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Log",
    "org": "THW",
    "platoon": true,
    "support": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ Log\/.*",
    "sub": [
        StAN_Log_ZTr,
        StAN_Log_V,
        StAN_Log_MW,
        StAN_Log_TS
    ]
};

let StAN_FK_ZTr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "FZ FK",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ FK\/ZTr FZ FK",
    "sub": [
        {
            "sign": "Person",
            "txt": "FK",
            "leading": true,
            "platoon": true,
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "FK",
                    "leading": true,
                    "platoontroop": true,
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Zugtruppführer\/in Fachzug Führung\/Kommunikation",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "FuncPattern": "Zugführer\/in Fachzug Führung\/Kommunikation",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FüKW",
            "name": "Führungskraftwagen"
        }
    ]
};

let StAN_FK_Stab = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "Stab",
    "org": "THW",
    "leading": true,
    "show_staff": true,
    "layout": "row-right",
    "UnitPattern": "FZ FK\/Stab \\(FK\\)",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "SGL",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "SGL",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "SGL",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "SGL",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "SGL",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "S6",
            "leading": true,
            "leader": true,
            "FuncPattern": "^Sachgebietsleiter\/in 6 \/ Fernmeldeführer\/in$"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        },
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "txt": "Stab",
            "org": "THW",
            "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
        }
    ]
};

let StAN_FK_F = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "F",
    "org": "THW",
    "group": true,
    "leading": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ FK\/FGr F",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "group": true,
            "leading": true,
            "txt": "F",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "F",
                    "FuncPattern": "Truppführer/in Führungsunterstützung",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "F",
                    "FuncPattern": "Truppführer/in Führungsunterstützung",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?"
                }
            ],
            "layout": "row-right",
            "FuncPattern": "Gruppenführer/in Führungsunterstützung",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FüKomKW",
            "name": "Führungs- und, Kommunikations-, kraftwagen",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "FüLa",
                    "name": "Anhänger, Führung und Lage"
                }
            ]
        }
    ]
};

let StAN_FK_K_A = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "K",
    "org": "THW",
    "group": true,
    "spez": "A",
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ FK\/FGr K \\(A\\)",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "group": true,
            "leading": true,
            "txt": "K",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "K"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "K"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FmKW",
            "name": "Fernmeldekraftwagen",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "K",
                    "name": "Anhänger, mit Spezialaufbau, für FGr K, (1 t Nutzlast)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "2t",
                    "name": "Anhänger, (2 t Nutzlast)"
                }
            ]
        }
    ]
};

let StAN_FK_K_B = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "K",
    "org": "THW",
    "group": true,
    "spez": "B",
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ FK\/FGr K \\(B\\)",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "group": true,
            "leading": true,
            "txt": "K",
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "K",
                    "FuncPattern": "Truppführer\/in Kommunikation",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "leading": true,
                    "troop": true,
                    "txt": "K",
                    "FuncPattern": "Truppführer\/in Kommunikation",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "troop": true,
                    "leading": true,
                    "txt": "K",
                    "FuncPattern": "Truppführer\/in Kommunikation",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "FuncPattern": "Fachhelfer\/in( \(Reserve\))?",
                }
            ],
            "layout": "row-right",
            "FuncPattern": "Gruppenführer\/in Kommunikation",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "FmKW",
            "name": "Fernmeldekraftwagen",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "K",
                    "name": "Anhänger, mit Spezialaufbau, für FGr K, (1 t Nutzlast)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "2t",
                    "name": "Anhänger, (2 t Nutzlast)"
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen, FGr",
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "automotive": true,
            "txt": "MastKW",
            "name": "Mastkraftwagen",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "RiFu",
                    "name": "Anhänger, Richtfunktechnik, (2 t Nutzlast)"
                }
            ]
        }
    ]
};

let StAN_FK = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "txt": "FK",
    "org": "THW",
    "platoon": true,
    "leading": true,
    "show_staff": true,
    "layout": "list-right",
    "UnitPattern": "FZ FK\/.*",
    "sub": [
        StAN_FK_ZTr,
        StAN_FK_Stab,
        StAN_FK_F,
        StAN_FK_K_A,
        StAN_FK_K_B
    ]
};

let StAN_GAGr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "GAGr",
    "show_staff": true,
    "layout": "row-right",
    "UnitPattern": "(\\d+)\\. GAGr",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "HeAnw",
            "FuncPattern": "Helferanwärter\/in"
        }
    ]
};

let StAN_JuGr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "JuGr",
    "show_staff": true,
    "layout": "row-right",
    "UnitPattern": "",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "JHe",
            "FuncPattern": "JHe"
        }
    ]
};

let StAN_AEGr = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "AEGr",
    "UnitPattern": ""
};

let StAN_Undisloziert = {
    "sign": "Unit",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "?",
    "name": "Undisloziert",
    "show_staff": true,
    "layout": "row-right",
    "UnitPattern": "",
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "He",
            "FuncPattern": ""
        }
    ]
}

let StAN_OV = {
    "sign": "Building",
    "colorPrimary": "#039",
    "colorAccent": "#FFF",
    "org": "THW",
    "txt": "OV",
    "name": "OV Musterstadt",
    "show_staff": true,
    "layout": "center-below",
    "UnitPattern": "OB\\+FaBe",
    "with": [
        {
            "sign": "Person",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "OB",
            "leading": true,
            "leader": true,
            "FuncPattern": "Ortsbeauftragte\/r"
        }
    ],
    "sub": [
        {
            "sign": "Empty",
            "colorPrimary": "#039",
            "colorAccent": "#000",
            "org": "THW",
            "top": true,
            "right": true,
            "bottom": true,
            "layout": "center-below",
            "with": [
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "THW",
                    "specialist": true,
                    "FuncPattern": "Fachberater\/in Stufe \\d+ und \\d+"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    "txt": "THW",
                    "specialist": true,
                    "FuncPattern": "Fachberater\/in Stufe \\d+ und \\d+"
                }
            ],
            "sub": [
                {
                    "sign": "Empty",
                    "colorPrimary": "#039",
                    "colorAccent": "#000",
                    "org": "THW",
                    "top": true,
                    "bottom": true,
                    "layout": "list-right-below",
                    "sub": [
                        StAN_OV_Stab,
                        StAN_GAGr,
                        StAN_JuGr,
                        StAN_AEGr,
                        StAN_Undisloziert
                    ]
                },
                StAN_TZ,
                StAN_Log,
                StAN_FK
            ]
        }
    ]
};