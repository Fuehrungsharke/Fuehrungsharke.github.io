function sumStaff(staffA, staffB) {
    var staff = [0, 0, 0, 0];
    staff[0] += staffA[0];
    staff[1] += staffA[1];
    staff[2] += staffA[2];
    staff[3] += staffA[3];
    staff[0] += staffB[0];
    staff[1] += staffB[1];
    staff[2] += staffB[2];
    staff[3] += staffB[3];
    return staff;
}

function getStaff(root) {
    if (root.staff != null)
        return root.staff;
    var staff = [0, 0, 0, 0];
    if (root.sign != null && root.sign == 'Person') {
        if (root.formation || root.brigade || root.association || root.platoon)
            staff[0]++;
        else if (root.platoontroop || root.group || root.echelon || root.troop)
            staff[1]++;
        else
            staff[2]++;
        staff[3]++;
    }
    if (Array.isArray(root.sub) && root.sub.length > 0) {
        var collapsedIndicator = root.sub.find(item => item.sign == 'Collapsed')
        if (collapsedIndicator != null && Array.isArray(collapsedIndicator.staff) && collapsedIndicator.staff.length == 4) {
            staff = collapsedIndicator.staff;
        }
        else {
            for (let idx in root.sub) {
                if (root.sub[idx].inactive)
                    continue;
                var subStaff = getStaff(root.sub[idx]);
                staff = sumStaff(staff, subStaff);
            }
        }
    }
    if (Array.isArray(root.with) && root.with.length > 0)
        for (let idx in root.with) {
            if (root.with[idx].inactive)
                continue;
            var subStaff = getStaff(root.with[idx]);
            staff = sumStaff(staff, subStaff);
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