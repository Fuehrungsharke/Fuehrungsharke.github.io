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

function visitArray(unitPattern, root, prop, req) {
    if (!Array.isArray(root[prop]))
        return null;
    let presetResult = null;
    for (const item of root[prop]) {
        let nodeResult = visitNode(unitPattern, item, req);
        if (nodeResult != null) {
            if (nodeResult.name == null || nodeResult.name == "")
                return nodeResult;
            presetResult = nodeResult;
        }
    }
    if (req.duplicate && presetResult != null) {
        let reserve = JSON.parse(JSON.stringify(presetResult));
        delete reserve.name;
        root[prop].push(reserve);
        return reserve;
    }
    return null;
}

function visitNode(unitPattern, root, req) {
    if (unitPattern != null && root.FuncPattern != null) {
        let rgxFunc = new RegExp(root.FuncPattern);
        if(unitPattern  == '') {
            if(req.unitName == ''
                && (rgxFunc.test(req.funcName) || rgxFunc.test(req.stateName))
                && (req.duplicate || root.name == null))
                return root;
        } else {
            let rgxUnit = new RegExp(unitPattern);
            if (rgxUnit.test(req.unitName)
                && (rgxFunc.test(req.funcName) || rgxFunc.test(req.stateName))
                && (req.duplicate || root.name == null))
                return root;
        }
    }
    unitPattern = root.UnitPattern ?? unitPattern;
    let subResult = visitArray(unitPattern, root, 'sub', req);
    if (subResult != null)
        return subResult;
    let withResult = visitArray(unitPattern, root, 'with', req);
    if (withResult != null)
        return withResult;
    return null;
}

function parseRow(ov, row, knownUnitNames) {
    if(row.length <= 6)
        return null;
    let unitName = row[4] ?? '';
    let funcName = row[5] ?? '';
    let stateName = row[2] ?? '';
    knownUnitNames.push(unitName);
    let req = {
        "unitName": unitName,
        "funcName": funcName,
        "stateName": stateName,
        "duplicate": false,
    };
    let res = visitNode(null, ov, req);
    if (res == null) {
        req.duplicate = true;
        res = visitNode(null, ov, req);
    }
    if (res == null)
        return;
    let lastName = row[0];
    let firstName = row[1];
    res.name = `${lastName}, ${firstName}`;
    res.isEB = row[3] == 'J';
    return res;
}

function setUnassignedInactive(root) {
    if (root.sign == 'Person') {
        if (root.name == null || root.name == '')
            root.inactive = true;
    }

    if (Array.isArray(root.sub))
        for (const item of root.sub)
            setUnassignedInactive(item);
    if (Array.isArray(root.with))
        for (const item of root.with)
            setUnassignedInactive(item);
}

function removeEmptyUnits(root) {
    if (root == null || root.sub == null || !Array.isArray(root.sub))
        return;

    let toRemove = [];
    for (const item of root.sub) {
        if (item.sign == 'Unit') {
            if (item.UnitPattern == null) {
                toRemove.push(item);
                continue;
            }

            let reg = new RegExp(item.UnitPattern);
            if (!knownUnitNames.some(unitName => reg.test(unitName))) {
                toRemove.push(item);
                continue;
            }
        }
        removeEmptyUnits(item);
    }
    root.sub = root.sub.filter(item => !toRemove.includes(item));
}

function parseConfig(data) {
    let preambleJson = 'data:application/json;base64,';
    if (data.startsWith(preambleJson)) {
        data = data.substring(preambleJson.length);
        let dataJson = b64DecodeUnicode(data);
        return JSON.parse(dataJson);
    }

    let valid = false;
    let preambleCSV = 'data:text/csv;base64,';
    if (data.startsWith(preambleCSV)) {
        data = data.substring(preambleCSV.length);
        valid = true;
    }

    let preambleExcel = 'data:application/vnd.ms-excel;base64,';
    if (data.startsWith(preambleExcel)) {
        data = data.substring(preambleExcel.length);
        valid = true;
    }

    if (!valid)
        return null;

    let dataCsv = atob(data);
    let rows = parseCsv(dataCsv, ';').splice(1);
    if (!Array.isArray(rows[0]))
        return null;

    let OV = JSON.parse(JSON.stringify(StAN_OV));
    knownUnitNames = [];

    for (const row of rows)
        parseRow(OV, row, knownUnitNames);

    knownUnitNames = [...new Set(knownUnitNames)];
    removeEmptyUnits(OV);
    setUnassignedInactive(OV);

    return OV;
}