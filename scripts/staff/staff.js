function getStaff(root) {
    if (root.staff != null)
        return root.staff;
    var staff = [0, 0, 0, 0];
    if (root.sign != null && root.sign == 'Person' && !root.inactive) {
        if (root.formation || root.brigade || root.association || root.platoon)
            staff[0]++;
        else if (root.platoontroop || root.group || root.echelon || root.troop)
            staff[1]++;
        else
            staff[2]++;
        staff[3]++;
    }
    if (Array.isArray(root.sub) && root.sub.length > 0)
        for (let idx in root.sub) {
            var subStaff = getStaff(root.sub[idx]);
            staff[0] += subStaff[0];
            staff[1] += subStaff[1];
            staff[2] += subStaff[2];
            staff[3] += subStaff[3];
        }
    if (Array.isArray(root.with) && root.with.length > 0)
        for (let idx in root.with) {
            var subStaff = getStaff(root.with[idx]);
            staff[0] += subStaff[0];
            staff[1] += subStaff[1];
            staff[2] += subStaff[2];
            staff[3] += subStaff[3];
        }
    return staff;
}

function toText(staff) {
    return `${staff[0]} / ${staff[1]} / ${staff[2]} / ${staff[3]}`;
}

function toStaff(text) {
    var match = text.match(/\d+/g);
    if (match.length == 3)
        return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2]), parseInt(match[0]) + parseInt(match[1]) + parseInt(match[2])];
    if (match.length == 4)
        return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    return null;
}