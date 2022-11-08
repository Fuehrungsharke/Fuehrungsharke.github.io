function parseCsv(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter)
            arrData.push([]);
        var strMatchedValue;
        if (arrMatches[2])
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        else
            strMatchedValue = arrMatches[3];
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

function parseUnits(unitNames) {
    var units = [];
    for (let idx in unitNames) {
        if (unitNames[idx] == null)
            continue;
        var matches = /(((\d+). )?([\wäöüÄÖÜ\ \+\-]+))(\/([\wäöüÄÖÜ\+\-]+)(\ ([\wäöüÄÖÜ\+]+([\-\ ]([\wäöüÄÖÜ\+]+))?))?(\ \(([\w]+)\))?)?/g.exec(unitNames[idx]);
        var unit = {
            'fullName': matches[0],
            'sign': 'Unit',
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "show_staff": true,
            "layout": "row-right"
        };

        if (matches[1] != null) {
            var parent = units.find(u => u.fullName == matches[1]);
            if (parent == null) {
                parent = {
                    'fullName': matches[1],
                    'sign': 'Unit',
                    "colorPrimary": "#039",
                    "colorAccent": "#FFF",
                    "org": "THW",
                    'txt': matches[4],
                    "show_staff": true,
                    "layout": "row-right-below"
                };
                if (parent.fullName == 'OV-Stab')
                    parent.leading = true;
                if (matches[3] != null)
                    parent.ordinal = matches[3];
                if (matches[4] == 'TZ' || matches[4].startsWith('FZ'))
                    parent.platoon = true;
                units.push(parent);
            }
            else
                parent.layout = "list-right-below";
            unit.parent = parent.fullName;
        }
        if (matches[5] == null)
            continue;

        if (matches[6] != null && matches[6] != 'FGr')
            unit.txt = matches[6];
        else if (matches[8] != null)
            unit.txt = matches[8];
        if (matches[6] == 'ZTr')
            unit.platoontroop = true;
        else if (matches[6] == 'FGr' || matches[6] == 'B')
            unit.group = true;
        else if (matches[6].endsWith('Tr'))
            unit.troop = true;
        if (matches[10] != null)
            unit.short = matches[10];
        if (matches[12] != null)
            unit.spez = matches[12];

        if (parent.sub == null)
            parent.sub = []
        parent.sub.push(unit);

        units.push(unit);
    }
    return units;
}

function parsePerson(columns, units) {
    var isQualified = columns[3] == 'J'
    var func = columns[5];
    var unit = units.find(u => u.fullName == columns[4]);
    var person = {
        'sign': 'Person',
        'colorPrimary': '#039',
        'colorAccent': '#FFF',
        'org': 'THW',
        'txt': unit.short != null ? unit.short : unit.txt,
        'name': `${columns[0]}, ${columns[1]}`,
        'inactive': !isQualified
    };
    if (func == null)
        return person;
    if (func.includes('Ortsbeauftragte')) {
        person.leading = true;
        person.txt = 'OB';
    }
    else if (func.includes('stv. Ortsbeauftragte')) {
        person.specialist = true;
        person.txt = 'stv. OB';
    }
    else if (func.includes('Ausbildungsbeauftragte')) {
        person.specialist = true;
        person.txt = 'AB';
    }
    else if (func.includes('Fachberater')) {
        person.specialist = true;
        person.txt = 'FaBe';
    }
    else if (func.includes('Schirrmeister')) {
        person.specialist = true;
        person.txt = 'SM';
    }
    else if (func.includes('Ortsjugendbeauftragte')) {
        person.specialist = true;
        person.txt = 'OJB';
    }
    else if (func.includes('stv. Ortsjugendbeauftragte')) {
        person.specialist = true;
        person.txt = 'stv. OJB';
    }
    else if (func.includes('Verwaltungsbeauftragte')) {
        person.specialist = true;
        person.txt = 'VwBe';
    }
    else if (func.includes('Beauftragte/r für Öffentlichkeitsarbeit')) {
        person.specialist = true;
        person.txt = 'BÖ';
    }
    else if (func.includes('Koch')) {
        person.specialist = true;
        person.txt = 'Koch';
    }
    else if (func.includes('Zugführer')) {
        person.leading = true;
        person.platoon = true;
    }
    else if (func.includes('Zugtruppführer')) {
        person.leading = true;
        person.platoontroop = true;
    }
    else if (func.includes('Gruppenführer')) {
        person.leading = true;
        person.group = true;
    }
    else if (func.includes('Truppführer')) {
        person.leading = true;
        person.troop = true;
    }
    else if (func.includes('Sachgebietsleiter')) {
        person.leading = true;
        person.txt = 'SGL';
    }
    else if (func.includes('Helferanwärter')) {
        person.txt = 'HeAnw';
    }
    return person;
}

function parseConfig(data) {
    var preambleJson = 'data:application/json;base64,';
    var preambleCSV = 'data:application/vnd.ms-excel;base64,';
    if (data.startsWith(preambleJson)) {
        data = data.substring(preambleJson.length);
        var dataJson = b64DecodeUnicode(data);
        return JSON.parse(dataJson);
    }
    else if (data.startsWith(preambleCSV)) {
        data = data.substring(preambleCSV.length);
        var dataCsv = atob(data);
        var rows = parseCsv(dataCsv, ';').splice(1);
        if (!Array.isArray(rows[0]))
            return null;
        var ov = {
            "sign": "Building",
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "txt": "OMST",
            "show_staff": true,
            "layout": "center-below"
        };
        var units = parseUnits([...new Set(rows.map(r => r[4]))]);
        units.push({
            'fullName': undefined,
            'sign': 'Unit',
            'txt': '?',
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW",
            "layout": "row-right-below"
        });
        ov.sub = units.filter(u => u.parent == null);
        for (let idx in rows) {
            var userUnit = units.find(u => u.fullName == rows[idx][4]);
            if (userUnit != null && Array.isArray(rows[idx]) && rows[idx].length > 5) {
                var person = parsePerson(rows[idx], units);
                if (person.platoon || person.group) {
                    if (userUnit.with == null)
                        userUnit.with = [];
                    userUnit.with.push(person);
                }
                else {
                    if (userUnit.sub == null)
                        userUnit.sub = [];
                    if (person.platoontroop || person.troop)
                        userUnit.sub.splice(0, 0, person);
                    else
                        userUnit.sub.push(person);
                }
            }
        }
        return ov;
    }
}