function sumStaff(staffA, staffB) {
    let staff = [0, 0, 0, 0];
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

function getStaff_HandlePerson(root) {
    if (root.sign == null || root.sign != 'Person' || root.inactive || (root.isEB == false && cbxInactiveNonEB.checked))
        return [0, 0, 0, 0];
    let staff = [0, 0, 0, 1];
    if (root.formation || root.brigade || root.association || root.platoon || root.leader)
        staff[0]++;
    else if (root.platoontroop || root.group || root.echelon || root.troop || root.subleader)
        staff[1]++;
    else
        staff[2]++;
    return staff;
}

function getStaff_HandleSub(root) {
    let staff = [0, 0, 0, 0];
    if (!Array.isArray(root.sub) || root.sub.length <= 0)
        return staff;
    let collapsedIndicator = root.sub.find(item => item.sign == 'Collapsed')
    if (collapsedIndicator != null && Array.isArray(collapsedIndicator.staff) && collapsedIndicator.staff.length == 4)
        return collapsedIndicator.staff;

    for (let idx in root.sub) {
        let subStaff = getStaff(root.sub[idx]);
        staff = sumStaff(staff, subStaff);
    }
    return staff;
}

function getStaff_HandleWith(root) {
    let staff = [0, 0, 0, 0];
    if (!Array.isArray(root.with) || root.with.length <= 0)
        return staff;
    for (let idx in root.with) {
        let withStaff = getStaff(root.with[idx]);
        staff = sumStaff(staff, withStaff);
    }
    return staff;
}

function getStaff(root) {
    if (root.staff != null)
        return root.staff;
    let staff = getStaff_HandlePerson(root);
    let staffSub = getStaff_HandleSub(root);
    staff = sumStaff(staff, staffSub);
    let staffWith = getStaff_HandleWith(root);
    staff = sumStaff(staff, staffWith);
    return staff;
}

function toText(staff) {
    return `${staff[0]} / ${staff[1]} / ${staff[2]} / ${staff[3]}`;
}

function toStaff(text) {
    let match = text.match(/\d+/g);
    if (match.length == 3)
        return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2]), parseInt(match[0]) + parseInt(match[1]) + parseInt(match[2])];
    if (match.length == 4)
        return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    return null;
}