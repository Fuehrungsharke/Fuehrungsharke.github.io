let StAN_OV_Stab = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "OV Stab",
    "leading": true,
    "sub": [
        {
            "sign": "Person",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "txt": "stv OB",
            "leading": true,
            "sub": [
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "AB",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Ausbildungsbeauftragte/r"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "OJB",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Ortsjugendbeauftragte/r"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "stv OJB",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "stv. Ortsjugendbeauftragte/r"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "SM",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Schirrmeister/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "BÖH",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Beauftragte/r für Öffentlichkeitsarbeit"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "Vw",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Verwaltungsbeauftragte/r"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "Ko",
                    "THWin": {
                        "Einheit": "OB-Stab",
                        "Position": "Koch/Köchin OV"
                    }
                }
            ],
            "layout": "row-right"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "0,5t",
                    "trailer": true
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "PKW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler"
        }
    ]
};

let StAN_TZ_ZTr = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoontroop": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
    "sub": [
        {
            "sign": "Person",
            "txt": "TZ",
            "leading": true,
            "platoon": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "TZ",
                    "leading": true,
                    "platoontroop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/ZTr TZ",
                        "Position": "Zugtruppführer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/ZTr TZ",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/ZTr TZ",
                        "Position": "Fachhelfer/in (Reserve)"
                    }
                }
            ],
            "layout": "row-right",
            "org": "THW",
            "THWin": {
                "Einheit": "#. TZ/ZTr TZ",
                "Position": "Zugführer/in"
            }
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "FüKW"
        }
    ]
};

let StAN_TZ_B = {
    "sign": "Unit",
    "txt": "B",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
    "sub": [
        {
            "txt": "B",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "B",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Truppführer/in Bergung"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "THWin": {
                        "Einheit": "#. TZ/B",
                        "Position": "Fachhelfer/in (Reserve)"
                    }
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "GKW",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "7t"
                }
            ]
        }
    ],
    "THWin": {
        "Einheit": "#. TZ/B",
        "Position": "Gruppenführer/in Bergung"
    }
};

let StAN_TZ_B_ASH = {
    "sign": "Unit",
    "txt": "B",
    "spez": "ASH",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
    "sub": [
        {
            "txt": "B",
            "name": "",
            "sign": "Person",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "B",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "GKW",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "7t"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Ru 12t"
                }
            ]
        }
    ]
};

let StAN_TZ_N = {
    "sign": "Unit",
    "txt": "N",
    "org": "THW",
    "group": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "N",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "N",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "NEA 50kVA LiMa"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF 12t"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "kl Boot",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "kl Boot"
                        }
                    ]
                }
            ]
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "Stapler 3t"
        }
    ]
};

let StAN_TZ_R_A = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "R",
    "spez": "A",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Bagger"
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "Bagger",
                            "chain": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Geräte-Container (FB)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Material-Container (FB)"
                }
            ]
        }
    ],
    "group": true
};

let StAN_TZ_R_B = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "R",
    "spez": "B",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Radlader"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Geräte-Container (FB)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Material-Container (FB)"
                }
            ]
        }
    ],
    "group": true
};

let StAN_TZ_R_C = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "R",
    "spez": "C",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "R",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "R",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-K 9t",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Tiefl 18t",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "Telelader"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "DLE"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Geräte-Container (FB)"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#FFFFFF",
                    "colorAccent": "#000000",
                    "trailer": true,
                    "name": "Material-Container (FB)"
                }
            ]
        }
    ],
    "group": true
};

let StAN_TZ_W_A = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "W",
    "spez": "A",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "W",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 7t",
            "name": "Lastkraftwagen (7t Nutzlast), mit Ladekran (270 kNm), (geländefähig)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "MzAB",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "MzAB",
                            "name": "Mehrzweck-, arbeitsboot"
                        }
                    ],
                    "name": "Anhänger, Mehrzweck-, arbeitsboot"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "MzAB",
                    "with": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
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
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "trailer": true,
            "name": "Material-Container",
            "org": "THW"
        }
    ],
    "group": true
};

let StAN_TZ_W_B = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "W",
    "spez": "B",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "W",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "W",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 7t",
            "name": "Lastkraftwagen (7t Nutzlast), mit Ladekran (270 kNm), (geländefähig)",
            "sub": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "PF 12t",
                    "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                    "sub": [
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "MzPt",
                            "name": "Halbponton"
                        },
                        {
                            "sign": "Boat",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
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
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "trailer": true,
            "name": "Material-Container",
            "org": "THW"
        }
    ],
    "group": true
};

let StAN_TZ_BrB = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "txt": "BrB",
    "group": true,
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "BrB",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "txt": "BrB",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MzGW",
            "name": "Mehrzweckgerätewagen, mit Ladebordwand"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "LKW-Lkr 1,5t",
            "name": "Lastkraftwagen, (1,5 t Nutzlast), mit Ladekran, (780 kNm)",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
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
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "group": true,
    "txt": "O",
    "spez": "A",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
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
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "group": true,
    "txt": "O",
    "spez": "B",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
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
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "group": true,
    "txt": "O",
    "spez": "C",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "O",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "O",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW TZ",
            "name": "Mannschafts-, transportwagen TZ"
        }
    ]
};

let StAN_TZ_Sp = {
    "sign": "Unit",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "show_staff": true,
    "group": true,
    "txt": "Sp",
    "sub": [
        {
            "name": "",
            "sign": "Person",
            "txt": "Sp",
            "leading": true,
            "group": true,
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "sub": [
                {
                    "sign": "Person",
                    "txt": "Sp",
                    "leading": true,
                    "troop": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW"
                }
            ],
            "layout": "row-right",
            "org": "THW"
        },
        {
            "sign": "Vehicle",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "automotive": true,
            "txt": "MTW FGr",
            "name": "Mannschafts-, transportwagen FGr",
            "with": [
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "trailer": true,
                    "txt": "Sp 2t",
                    "name": "Anhänger, mit Spezialaufbau, FGr Sp, (2 t Zuladung)"
                }
            ]
        }
    ]
};

let StAN_TZ = {
    "sign": "Unit",
    "txt": "TZ",
    "org": "THW",
    "platoon": true,
    "show_staff": true,
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "layout": "list-right",
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
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "SB",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "SB",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "SB",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MzGW",
                    "name": "Mehrzweckgerätewagen, Plane/Spriegel, mit Ladebordwand"
                }
            ],
            "spez": "A"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "SB",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "SB",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "SB",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "SB",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MzGW",
                    "name": "Mehrzweckgerätewagen, Plane/Spriegel, mit Ladebordwand",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "automotive": true,
                            "txt": "PF 12t",
                            "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "ERS",
                    "name": "Rettungsspinne"
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "BT",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "BT",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "BT",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MLW IV",
                    "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "trailer": true,
                            "txt": "BT 2t",
                            "name": "Anhänger"
                        }
                    ]
                }
            ],
            "spez": "A"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "I",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "I",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "I",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "I",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MLW IV",
                    "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MTW FGr",
                    "name": "Mannschafts-, transportwagen FGr",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "I 2t",
                            "name": "Anhänger, mit Spezialaufbau, für FGr I, (2 t Nutzlast)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "E",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "E",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "E",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "NEA 200 kVA",
                            "name": "Anhänger, Netzersatzanlage, (ca. 200 kVA)",
                            "trailer": true
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "NEA 650 kVA",
                            "name": "Anhänger, Netzersatzanlage, (ca. 650 kVA)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "TW",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "TW",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "TW",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "TW",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "TWAA",
                            "name": "Anhänger, Trinkwasser-, aufbereitungs-, anlage",
                            "trailer": true
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "trailer": true,
                            "txt": "TWAA 15m³/h",
                            "name": "Trinkwasser-, aufbereitungs-, anlage, (15 m³/h)"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "BDF Lafette",
                            "name": "Anhänger, BDF Lafette",
                            "trailer": true,
                            "sub": [
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "trailer": true,
                                    "txt": "TW-Labor",
                                    "name": "Trinkwasserlabor-, Container"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "trailer": true,
                                    "txt": "TW-Tank",
                                    "name": "Tankcontainer, für Trinkwasser"
                                }
                            ]
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "Stapler 2t",
                    "name": "Stapler, (2 t Hubkraft,, geländefähig)"
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "WP",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "SwPu 5.000l/min",
                            "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (5.000 l/min)",
                            "trailer": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MLW IV",
                    "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "7t",
                            "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "A"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "WP",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "SwPu 15.000l/min",
                            "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (15.000 l/min)",
                            "trailer": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MLW IV",
                    "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "7t",
                            "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "WP",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "WP",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "WP",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lbw 7t",
                    "name": "Lastkraftwagen, Plane/Spriegel, mit Ladebordwand, (7 t Nutzlast)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "SwPu 25.000l/min",
                            "name": "Anhänger, mit Schmutzwasser-, Kreiselpumpe, (25.000 l/min)",
                            "trailer": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MLW IV",
                    "name": "Mannschafts-, lastwagen IV, Plane/Spriegel, mit Ladebordwand",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "7t",
                            "name": "Anhänger, Plane/Spriegel, mit Aufnahmen, für Container, (7 t Zuladung)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "C"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "Öl",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW",
                    "name": "Lastkraftwagen, Wechsellader",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "name": "Materialcontainer",
                            "trailer": true
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "name": "Abrollbehälter, Separationsanlage, (160 m³/h)",
                            "trailer": true,
                            "txt": "SepCon 160m³/h"
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lkr 7t",
                    "name": "Lastkraftwagen, (7 t Nutzlast), mit Ladekran, (410 kNm)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "PF 12t",
                            "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "A"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "Öl",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW",
                    "name": "Lastkraftwagen, Wechsellader",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "name": "Materialcontainer",
                            "trailer": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW-Lkr 9t",
                    "name": "Lastkraftwagen, (9 t Nutzlast), mit Ladekran, (180 kNm)",
                    "with": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "PF 12t",
                            "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                            "trailer": true
                        }
                    ]
                }
            ],
            "spez": "B"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "txt": "Öl",
            "group": true,
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "Öl",
                    "leading": true,
                    "group": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "txt": "Öl",
                            "leading": true,
                            "troop": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW"
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "LKW",
                    "name": "Lastkraftwagen, Wechsellader",
                    "sub": [
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "name": "Materialcontainer",
                            "trailer": true
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "name": "Abrollbehälter, Separationsanlage, (40 m³/h)",
                            "trailer": true,
                            "txt": "SepCon 40m³/h"
                        },
                        {
                            "sign": "Vehicle",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "txt": "PF 12t",
                            "name": "Anhänger Plattform, mit Aufnahmen, für Container, (12 t Zuladung)",
                            "trailer": true
                        }
                    ]
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "Stapler 3t",
                    "name": "Stapler, (3 t Hubkraft,, geländefähig)"
                }
            ],
            "spez": "C"
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "troop": true,
            "txt": "ESS",
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "ESS",
                    "leading": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW",
                    "troop": true
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MTW TZ",
                    "name": "Mannschafts-, transportwagen TZ"
                }
            ]
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "troop": true,
            "txt": "MHP",
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "MHP",
                    "leading": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW",
                    "troop": true
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "MTW",
                    "name": "Mannschafts-, transportwagen, (geländegängig)",
                    "offroad": true,
                    "automotive": true
                }
            ]
        },
        {
            "sign": "Unit",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "show_staff": true,
            "troop": true,
            "txt": "UL",
            "sub": [
                {
                    "name": "",
                    "sign": "Person",
                    "txt": "UL",
                    "leading": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "sub": [
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        },
                        {
                            "sign": "Person",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW"
                        }
                    ],
                    "layout": "row-right",
                    "org": "THW",
                    "troop": true
                },
                {
                    "sign": "Vehicle",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "automotive": true,
                    "txt": "MTW TZ",
                    "name": "Mannschafts-, transportwagen TZ"
                }
            ]
        }
    ]
};

let StAN_OV = {
    "sign": "Building",
    "colorPrimary": "#003399",
    "colorAccent": "#FFFFFF",
    "org": "THW",
    "txt": "OV",
    "name": "OV Musterstadt",
    "sub": [
        {
            "sign": "Empty",
            "colorPrimary": "#003399",
            "colorAccent": "#000",
            "org": "THW",
            "sub": [
                {
                    "sign": "Empty",
                    "colorPrimary": "#003399",
                    "colorAccent": "#000",
                    "org": "THW",
                    "sub": [
                        StAN_OV_Stab,
                        {
                            "sign": "Unit",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "show_staff": true,
                            "txt": "GAGr"
                        },
                        {
                            "sign": "Unit",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "show_staff": true,
                            "txt": "JuGr"
                        },
                        {
                            "sign": "Unit",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "show_staff": true,
                            "txt": "AEGr",
                            "THWin": {
                                "Einheit": "",
                                "Position": ""
                            }
                        }
                    ],
                    "top": true,
                    "layout": "list-right-below",
                    "bottom": true
                },
                StAN_TZ,
                {
                    "sign": "Unit",
                    "txt": "Log",
                    "org": "THW",
                    "platoon": true,
                    "show_staff": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "layout": "list-right",
                    "sub": [
                        {
                            "sign": "Unit",
                            "txt": "FZ Log",
                            "org": "THW",
                            "platoontroop": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "sub": [
                                {
                                    "sign": "Person",
                                    "name": "",
                                    "txt": "Log",
                                    "leading": true,
                                    "platoon": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "txt": "Log",
                                            "leading": true,
                                            "platoontroop": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right",
                                    "org": "THW"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "FüKW"
                                }
                            ],
                            "name": ""
                        },
                        {
                            "sign": "Unit",
                            "txt": "Log-V",
                            "org": "THW",
                            "group": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "name": "",
                            "support": true,
                            "sub": [
                                {
                                    "txt": "Log-V",
                                    "name": "",
                                    "sign": "Person",
                                    "leading": true,
                                    "group": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "sub": [
                                        {
                                            "txt": "Log-V",
                                            "sign": "Person",
                                            "leading": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "troop": true,
                                            "org": "THW"
                                        },
                                        {
                                            "txt": "Log-V",
                                            "sign": "Person",
                                            "leading": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "troop": true,
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right",
                                    "org": "THW"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "LKW-Lbw",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "12t"
                                        }
                                    ]
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "MTW FGr",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "Kühl"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "sign": "Unit",
                            "txt": "Log-MW",
                            "org": "THW",
                            "group": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right-below",
                            "support": true,
                            "sub": [
                                {
                                    "sign": "Unit",
                                    "txt": "Log-M",
                                    "org": "THW",
                                    "show_staff": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "layout": "list-right",
                                    "troop": true,
                                    "support": true,
                                    "name": "",
                                    "sub": [
                                        {
                                            "txt": "Log-M",
                                            "sign": "Person",
                                            "leading": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "troop": true,
                                            "sub": [
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                }
                                            ],
                                            "layout": "row-right",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "txt": "LKW-Lkr",
                                            "offroad": true,
                                            "automotive": true,
                                            "sub": [
                                                {
                                                    "sign": "Vehicle",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW",
                                                    "trailer": true,
                                                    "txt": "PF",
                                                    "with": [
                                                        {
                                                            "sign": "Vehicle",
                                                            "colorPrimary": "#003399",
                                                            "colorAccent": "#FFFFFF",
                                                            "org": "THW",
                                                            "txt": "Wks",
                                                            "trailer": true
                                                        }
                                                    ]
                                                },
                                                {
                                                    "sign": "Vehicle",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW",
                                                    "txt": "2t",
                                                    "trailer": true
                                                }
                                            ]
                                        },
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "offroad": true,
                                            "automotive": true,
                                            "txt": "PKW"
                                        }
                                    ]
                                },
                                {
                                    "sign": "Unit",
                                    "txt": "Log-VG",
                                    "org": "THW",
                                    "show_staff": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "layout": "list-right",
                                    "troop": true,
                                    "support": true,
                                    "name": "",
                                    "sub": [
                                        {
                                            "txt": "Log-VG",
                                            "sign": "Person",
                                            "leading": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "troop": true,
                                            "sub": [
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                },
                                                {
                                                    "sign": "Person",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW"
                                                }
                                            ],
                                            "layout": "row-right",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "txt": "MLW IV",
                                            "offroad": true,
                                            "automotive": true,
                                            "with": [
                                                {
                                                    "sign": "Vehicle",
                                                    "colorPrimary": "#003399",
                                                    "colorAccent": "#FFFFFF",
                                                    "org": "THW",
                                                    "trailer": true,
                                                    "txt": "5t"
                                                }
                                            ]
                                        },
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "automotive": true,
                                            "txt": "Stapler 3t"
                                        }
                                    ]
                                }
                            ],
                            "name": "",
                            "with": [
                                {
                                    "txt": "Log-MW",
                                    "name": "",
                                    "sign": "Person",
                                    "leading": true,
                                    "group": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW"
                                }
                            ]
                        },
                        {
                            "sign": "Unit",
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "org": "THW",
                            "show_staff": true,
                            "troop": true,
                            "support": true,
                            "txt": "TS",
                            "sub": [
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "txt": "TS",
                                    "troop": true,
                                    "leading": true,
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "SZM",
                                    "name": "Sattelzugmaschine, (zugelassen, für Gefahrgut)",
                                    "sub": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "Aufl",
                                            "name": "Auflieger Container"
                                        },
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "Aufl Pr-Lbw",
                                            "name": "Auflieger Pritsche, Plane/Spriegel, mit Ladebordwand"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "support": true,
                    "name": ""
                },
                {
                    "sign": "Unit",
                    "txt": "FK",
                    "org": "THW",
                    "platoon": true,
                    "show_staff": true,
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "layout": "list-right",
                    "sub": [
                        {
                            "sign": "Unit",
                            "txt": "FZ FK",
                            "org": "THW",
                            "platoontroop": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "sub": [
                                {
                                    "sign": "Person",
                                    "name": "",
                                    "txt": "FK",
                                    "leading": true,
                                    "platoon": true,
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "txt": "FK",
                                            "leading": true,
                                            "platoontroop": true,
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right",
                                    "org": "THW"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "FüKW"
                                }
                            ],
                            "name": ""
                        },
                        {
                            "sign": "Unit",
                            "txt": "Stab",
                            "org": "THW",
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "row-right",
                            "name": "",
                            "leading": true,
                            "sub": [
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                },
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                },
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                },
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                },
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                },
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "txt": "SGL",
                                    "leading": true,
                                    "org": "THW"
                                }
                            ]
                        },
                        {
                            "sign": "Unit",
                            "txt": "F",
                            "org": "THW",
                            "group": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "name": "",
                            "leading": true,
                            "sub": [
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "group": true,
                                    "leading": true,
                                    "txt": "F",
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "F"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "F"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "FüKomKW",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "FüLa"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "sign": "Unit",
                            "txt": "K",
                            "org": "THW",
                            "group": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "name": "",
                            "sub": [
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "group": true,
                                    "leading": true,
                                    "txt": "K",
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "K"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "K"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "FmKW",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "K"
                                        }
                                    ]
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "MTW FGr",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "2t"
                                        }
                                    ]
                                }
                            ],
                            "spez": "A"
                        },
                        {
                            "sign": "Unit",
                            "txt": "K",
                            "org": "THW",
                            "group": true,
                            "show_staff": true,
                            "colorPrimary": "#003399",
                            "colorAccent": "#FFFFFF",
                            "layout": "list-right",
                            "name": "",
                            "sub": [
                                {
                                    "sign": "Person",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "group": true,
                                    "leading": true,
                                    "txt": "K",
                                    "sub": [
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "K"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "leading": true,
                                            "troop": true,
                                            "txt": "K"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "troop": true,
                                            "leading": true,
                                            "txt": "K"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        },
                                        {
                                            "sign": "Person",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW"
                                        }
                                    ],
                                    "layout": "row-right"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "FmKW",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "K"
                                        }
                                    ]
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "MTW FGr",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "2t"
                                        }
                                    ]
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "MTW FGr"
                                },
                                {
                                    "sign": "Vehicle",
                                    "colorPrimary": "#003399",
                                    "colorAccent": "#FFFFFF",
                                    "org": "THW",
                                    "automotive": true,
                                    "txt": "MastKW",
                                    "with": [
                                        {
                                            "sign": "Vehicle",
                                            "colorPrimary": "#003399",
                                            "colorAccent": "#FFFFFF",
                                            "org": "THW",
                                            "trailer": true,
                                            "txt": "RiFu"
                                        }
                                    ]
                                }
                            ],
                            "spez": "B"
                        }
                    ],
                    "leading": true,
                    "name": ""
                }
            ],
            "top": true,
            "right": true,
            "bottom": true,
            "layout": "center-below",
            "with": [
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "THW",
                    "specialist": true,
                    "THWin": {
                        "Einheit": "OB+FaBe",
                        "Position": "Fachberater/in Stufe 1 und 2"
                    }
                },
                {
                    "sign": "Person",
                    "colorPrimary": "#003399",
                    "colorAccent": "#FFFFFF",
                    "org": "THW",
                    "txt": "THW",
                    "specialist": true,
                    "THWin": {
                        "Einheit": "OB+FaBe",
                        "Position": "Fachberater/in Stufe 3 und 4"
                    }
                }
            ]
        }
    ],
    "layout": "center-below",
    "with": [
        {
            "sign": "Person",
            "colorPrimary": "#003399",
            "colorAccent": "#FFFFFF",
            "org": "THW",
            "txt": "OB",
            "leading": true,
            "THWin": {
                "Einheit": "OB+FaBe",
                "Position": "Ortsbeauftragte/r"
            }
        }
    ],
    "show_staff": true
};

// config = StAN_OV;