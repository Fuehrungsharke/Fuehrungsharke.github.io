var customOrgs = [];

function NewOrgCmd() { }

NewOrgCmd.prototype.__proto__ = new CmdBase();

NewOrgCmd.prototype.execute = function () {
    var newOrgName = prompt('Name', 'Benutzerdefiniert');
    var newOrgKey = prompt('Kürzel', 'XXX');
    var newOrgColorPrimary = prompt('Farbe', 'purple');
    var newOrgColorAccent = prompt('Kontrastfarbe', 'white');
    var newOrg = {
        "name": newOrgName,
        "type": "radio",
        "key": newOrgKey,
        "icon": `data:image/svg+xml;utf8,
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256">
        <ellipse cx="128" cy="128" rx="128" ry="128" fill="${newOrgColorPrimary}" stroke-width="5" stroke="black" />
        <ellipse cx="128" cy="128" rx="43" ry="43" fill="${newOrgColorAccent}" />
    </svg>`,
        "implicitAttritbues": {
            "colorPrimary": newOrgColorPrimary,
            "colorAccent": newOrgColorAccent
        }
    };
    customOrgs.push(newOrg);
    for (let i = 0; i < this.selectedElements.length; i++) {
        this.selectedElements[i].org = newOrgKey;
        this.selectedElements[i].colorPrimary = newOrgColorPrimary;
        this.selectedElements[i].colorAccent = newOrgColorAccent;
    }
    return true;
}