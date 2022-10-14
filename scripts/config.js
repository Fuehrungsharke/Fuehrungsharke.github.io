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
            "org": "THW"
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
                    'txt': matches[4]
                };
                if (parent.fullName == 'OV-Stab')
                    parent.short = 'Stab';
                if (matches[3] != null)
                    parent.ordinal = matches[3];
                if (matches[4] == 'TZ' || matches[4].startsWith('FZ'))
                    parent.platoon = true;
                units.push(parent);
            }
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
            unit.spez = matches[10];

        if (parent.sub == null)
            parent.sub = []
        parent.sub.push(unit);

        units.push(unit);
    }
    return units;
}

function parsePerson(columns, units) {
    var isQualified = columns[3] == 'J'
    var func = null;
    if (columns[5] != null)
        func = columns[5].split('/')[0]
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
    if (func == 'Ortsbeauftragte') {
        person.leading = true;
        person.txt = 'OB';
    }
    else if (func == 'stv. Ortsbeauftragte') {
        person.specialist = true;
        person.txt = 'stv. OB';
    }
    else if (func == 'Ausbildungsbeauftragte') {
        person.specialist = true;
        person.txt = 'AB';
    }
    else if (func == 'Fachberater') {
        person.specialist = true;
        person.txt = 'FaBe';
    }
    else if (func == 'Schirrmeister') {
        person.specialist = true;
        person.txt = 'SM';
    }
    else if (func == 'Ortsjugendbeauftragte') {
        person.specialist = true;
        person.txt = 'OJB';
    }
    else if (func == 'Koch') {
        person.specialist = true;
        person.txt = 'Koch';
    }
    else if (func == 'Zugführer') {
        person.leading = true;
        person.platoon = true;
    }
    else if (func == 'Zugtruppführer') {
        person.leading = true;
        person.platoontroop = true;
    }
    else if (func == 'Gruppenführer') {
        person.leading = true;
        person.group = true;
    }
    else if (func == 'Truppführer') {
        person.leading = true;
        person.troop = true;
    }
    else if (func == 'Helferanwärter') {
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
            "txt": "OMST"
        };
        var units = parseUnits([...new Set(rows.map(r => r[4]))]);
        units.push({
            'fullName': undefined,
            'sign': 'Unit',
            'txt': '?',
            "colorPrimary": "#039",
            "colorAccent": "#FFF",
            "org": "THW"
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