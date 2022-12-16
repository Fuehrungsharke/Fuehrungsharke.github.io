function parseCsv(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    let objPattern = new RegExp(
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
    let arrData = [[]];
    let arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        let strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter)
            arrData.push([]);
        let strMatchedValue;
        if (arrMatches[2])
            strMatchedValue = arrMatches[2].replace(/\"\"/g, "\"");
        else
            strMatchedValue = arrMatches[3];
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return (arrData);
}

function buildParentUnit(fullName, text, ordinal) {
    let parent = {
        'fullName': fullName,
        'sign': 'Unit',
        "colorPrimary": "#039",
        "colorAccent": "#FFF",
        "org": "THW",
        'txt': text,
        "show_staff": true,
        "layout": "row-right-below"
    };
    if (parent.fullName == 'OV-Stab')
        parent.leading = true;
    if (ordinal != null)
        parent.ordinal = ordinal;
    if (text == 'TZ' || text.startsWith('FZ'))
        parent.platoon = true;
    return parent;
}

function parseUnit(units, idx) {
    let matches = /(((\d+). )?([\wäöüÄÖÜ\ \+\-]+))(\/([\wäöüÄÖÜ\+\-]+)(\ ([\wäöüÄÖÜ\+]+([\-\ ]([\wäöüÄÖÜ\+]+))?))?(\ \(([\w]+)\))?)?/g.exec(unitNames[idx]);
    let unit = {
        'fullName': matches[0],
        'sign': 'Unit',
        "colorPrimary": "#039",
        "colorAccent": "#FFF",
        "org": "THW",
        "show_staff": true,
        "layout": "row-right"
    };
    if (matches[1] != null) {
        let parent = units.find(u => u.fullName == matches[1]);
        if (parent == null) {
            parent = buildParentUnit(matches[1], matches[3], matches[4]);
            units.push(parent);
        }
        else
            parent.layout = "list-right-below";
        unit.parent = parent.fullName;
    }
    if (matches[5] == null)
        return;

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

function parseUnits(unitNames) {
    let units = [];
    for (let idx in unitNames) {
        if (unitNames[idx] == null)
            continue;
        parseUnit(units, idx);
    }
    return units;
}

function setFuncAttributes(person, func) {
    if (func == null)
        return person;

    if (func.includes('stv. Ortsbeauftragte')) {
        person.specialist = true;
        person.txt = 'stv. OB';
        return person;
    }

    if (func.includes('Ortsbeauftragte')) {
        person.leading = true;
        person.txt = 'OB';
        return person;
    }

    if (func.includes('Ausbildungsbeauftragte')) {
        person.specialist = true;
        person.txt = 'AB';
        return person;
    }

    if (func.includes('Fachberater')) {
        person.specialist = true;
        person.txt = 'FaBe';
        return person;
    }

    if (func.includes('Schirrmeister')) {
        person.specialist = true;
        person.txt = 'SM';
        return person;
    }

    if (func.includes('stv. Ortsjugendbeauftragte')) {
        person.specialist = true;
        person.txt = 'stv. OJB';
        return person;
    }

    if (func.includes('Ortsjugendbeauftragte')) {
        person.specialist = true;
        person.txt = 'OJB';
        return person;
    }

    if (func.includes('Verwaltungsbeauftragte')) {
        person.specialist = true;
        person.txt = 'VwBe';
        return person;
    }

    if (func.includes('Beauftragte/r für Öffentlichkeitsarbeit')) {
        person.specialist = true;
        person.txt = 'BÖ';
        return person;
    }

    if (func.includes('Koch')) {
        person.specialist = true;
        person.txt = 'Koch';
        return person;
    }

    if (func.includes('Zugführer')) {
        person.leading = true;
        person.platoon = true;
        return person;
    }

    if (func.includes('Zugtruppführer')) {
        person.leading = true;
        person.platoontroop = true;
        return person;
    }

    if (func.includes('Gruppenführer')) {
        person.leading = true;
        person.group = true;
        return person;
    }

    if (func.includes('Truppführer')) {
        person.leading = true;
        person.troop = true;
        return person;
    }

    if (func.includes('Sachgebietsleiter')) {
        person.leading = true;
        person.txt = 'SGL';
        return person;
    }

    if (func.includes('Helferanwärter')) {
        person.txt = 'HeAnw';
        return person;
    }

    return person;
}

function parsePerson(columns, units) {
    let isQualified = columns[3] == 'J'
    let func = columns[5];
    let unit = units.find(u => u.fullName == columns[4]);
    return setFuncAttributes({
        'sign': 'Person',
        'colorPrimary': '#039',
        'colorAccent': '#FFF',
        'org': 'THW',
        'txt': unit.short != null ? unit.short : unit.txt,
        'name': `${columns[0]}, ${columns[1]}`,
        'inactive': !isQualified
    }, func);
}

function parseRow(units, row) {
    let userUnit = units.find(u => u.fullName == row[4]);
    if (userUnit == null || !Array.isArray(row) || row.length <= 5)
        return;

    let person = parsePerson(row, units);
    if (person.platoon || person.group) {
        if (userUnit.with == null)
            userUnit.with = [];
        userUnit.with.push(person);
        return;
    }

    if (userUnit.sub == null)
        userUnit.sub = [];
    if (person.platoontroop || person.troop)
        userUnit.sub.splice(0, 0, person);
    else
        userUnit.sub.push(person);
}

function parseConfig(data) {
    let preambleJson = 'data:application/json;base64,';
    if (data.startsWith(preambleJson)) {
        data = data.substring(preambleJson.length);
        let dataJson = b64DecodeUnicode(data);
        return JSON.parse(dataJson);
    }

    let preambleCSV = 'data:application/vnd.ms-excel;base64,';
    if (!data.startsWith(preambleCSV))
        return null;

    data = data.substring(preambleCSV.length);
    let dataCsv = atob(data);
    let rows = parseCsv(dataCsv, ';').splice(1);
    if (!Array.isArray(rows[0]))
        return null;
    let ov = {
        "sign": "Building",
        "colorPrimary": "#039",
        "colorAccent": "#FFF",
        "org": "THW",
        "txt": "OMST",
        "show_staff": true,
        "layout": "center-below"
    };
    let units = parseUnits([...new Set(rows.map(r => r[4]))]);
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
    for (let idx in rows)
        parseRow(units, rows[idx]);
    return ov;
}