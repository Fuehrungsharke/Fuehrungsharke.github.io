import CmdBase from "./cmd_base.mjs";

let customOrgs = [];

export default function NewOrgCmd() { }

NewOrgCmd.prototype.__proto__ = new CmdBase();

NewOrgCmd.prototype.execute = function () {
    let newOrgName = prompt('Name', 'Benutzerdefiniert');
    let newOrgKey = prompt('Kürzel', 'XXX');
    let newOrgColorPrimary = prompt('Farbe', 'purple');
    let newOrgColorAccent = prompt('Kontrastfarbe', 'white');
    let newOrg = {
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
    for (const selectedElement of this.selectedElements) {
        selectedElement.org = newOrgKey;
        selectedElement.colorPrimary = newOrgColorPrimary;
        selectedElement.colorAccent = newOrgColorAccent;
    }
    return true;
}