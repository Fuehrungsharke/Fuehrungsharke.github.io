function getStaff(root) {
    var staff = [0, 0, 0, 0];
    if (root.sign != null && root.sign == 'Person') {
        if (root.leading) {
            if (root.platoon)
                staff[0]++;
            else if (root.platoontroop || root.group || root.troop)
                staff[1]++;
        }
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