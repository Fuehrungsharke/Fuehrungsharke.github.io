const SUBMENU = 'submenu';
const PLACEHOLDER = 'placeholder';
const BOOL = 'bool';
const RADIO = 'radio';
const CMD = 'cmd';
const STRING = 'string';
const HEADER = 'header';
const CMD_PASTE_SUB = 'paste_sub';
const CMD_PASTE_WITH = 'paste_with';
const CMD_PASTE_SIBLING = 'paste_sibling';
const CMD_PASTE_PARENT = 'paste_parent';
const CMD_DELETE_SINGLE = 'delete_single';
const CMD_DELETE_TREE = 'delete_tree';
const CMD_NEW_ORG = 'new_org';
const CMD_SET_STAFF = 'set_staff';
const CMD_RESET_STAFF = 'reset_staff';
const CMD_COLLAPSE = 'collapse';
const CMD_DECOLLAPSE = 'decollapse';

var cachedElement = null;
var customOrgs = [];
var commmands = {
    'copy': new CopyCmd(),
    'add': {
        'add_parent': new AddParentCmd(),
        'add_sibling': new AddSibCmd(),
        'add_sub': new AddSubCmd(),
        'add_with': new AddWithCmd(),
    },
    'cut_single': new CutSingleCmd(),
    'cut_tree': new CutTreeCmd(),
    'delete_single': new DeleteSingleCmd(),
    'delete_tree': new DeleteTreeCmd(),
};

function getPlaceholder(name) {
    if (name == 'CustomOrgs')
        return customOrgs;
    else
        return JSON.parse(getResource(`/menus/${name}.json`))
}

function buildMenuItem(root, parentMenuItem, attrItem) {
    if (attrItem.type == PLACEHOLDER) {
        attrItem = getPlaceholder(attrItem.name);
        if (Array.isArray(attrItem))
            if (attrItem.length > 0)
                return buildMenu(root, parentMenuItem, attrItem);
            else
                return null;
    }
    var key = attrItem.key;
    var menuItem = document.createElement('li');
    menuItem.classList.add('context-menu-item');

    if (attrItem.icon != null) {
        var icon = document.createElement('img');
        icon.setAttribute('src', attrItem.icon);
        menuItem.appendChild(icon);
    }

    if (attrItem.styles != null)
        for (let idx in attrItem.styles)
            menuItem.classList.add(attrItem.styles[idx]);

    if (attrItem.cmd != null)
        menuItem.setAttribute('cmd', attrItem.cmd);
    if (key != null)
        menuItem.setAttribute('key', key);
    if (parentMenuItem != null && parentMenuItem.key != null)
        key = parentMenuItem.key;
    var content = '';
    if (root != null && root[key] != null)
        content = root[key];
    switch (attrItem.type) {
        case SUBMENU:
            menuItem.classList.add('with-submenu');
            menuItem.appendChild(document.createTextNode(`${attrItem.name}`));
            var subMenu = document.createElement('ul');
            if (parentMenuItem != null && parentMenuItem.type == SUBMENU)
                subMenu.classList.add('sub-sub-menu');
            else
                subMenu.classList.add('sub-menu');
            var subMenuItems = buildMenu(root, attrItem, attrItem.values);
            subMenu.replaceChildren(...subMenuItems);
            menuItem.appendChild(subMenu);
            break;
        case BOOL:
        case RADIO:
        case CMD:
            if (content == true || content == attrItem.key)
                menuItem.classList.add('menu-item-selected');
            menuItem.appendChild(document.createTextNode(attrItem.name));
            break;
        case STRING:
            menuItem.appendChild(document.createTextNode(`\t${attrItem.name}: ${content}`));
            break;
        case HEADER:
            var menuItem = document.createElement('li');
            menuItem.classList.add('context-menu-header');
            menuItem.appendChild(document.createTextNode(attrItem.name));
            break;
    }
    return menuItem;
}

function buildMenu(root, parentMenuItem, attrMenu) {
    var menuItems = [];
    if (Array.isArray(attrMenu) && attrMenu.length > 0)
        for (let idx in attrMenu) {
            var menuItem = buildMenuItem(root, parentMenuItem, attrMenu[idx]);
            if (Array.isArray(menuItem) && menuItem.length > 0)
                menuItems = menuItems.concat(menuItem);
            else if (menuItem != null)
                menuItems.push(menuItem);
        }
    else {
        var menuItem = buildMenuItem(root, parentMenuItem, attrMenu);
        if (Array.isArray(menuItem) && menuItem.length > 0)
            menuItems = menuItems.concat(menuItem);
        else
            menuItems.push(menuItem);
    }
    return menuItems;
}

function openSignContextMenu(evt, sign) {
    var uuid = sign.getAttributeNS(null, 'uuid');
    var root = getByUuid(config, uuid);

    var attrMenu = JSON.parse(getResource(`/menus/${root.sign}.json`));
    var newMenuItems = buildMenu(root, null, attrMenu);

    var menuDefault = buildMenu(root, null, JSON.parse(getResource('/menus/menu_default.json')));
    newMenuItems = newMenuItems.concat(menuDefault);

    var menuItems = document.querySelector('.context-menu .menu');
    menuItems.setAttribute('uuid', uuid);
    menuItems.replaceChildren(...newMenuItems);

    var touchpos = getEvtPos(evt);
    var menu = document.querySelector('.context-menu');
    menu.style.left = touchpos.pageX + "px";
    menu.style.top = touchpos.pageY + "px";
    menu.classList.add('context-menu-active');
}

function closeSignContextMenu() {
    var menu = document.querySelector('.context-menu');
    menu.classList.remove('context-menu-active');
}

function getUuidOfContextMenu(menuItem) {
    if (menuItem.parentElement.classList.contains('sub-menu')
        || menuItem.parentElement.classList.contains('sub-sub-menu'))
        return getUuidOfContextMenu(menuItem.parentElement.parentElement);
    return menuItem.parentElement.getAttributeNS(null, 'uuid');
}

function getAttribute(attrMenu, key) {
    for (let idx in attrMenu) {
        var attrItem = attrMenu[idx];
        if (attrItem.type == PLACEHOLDER)
            attrItem = getPlaceholder(attrItem.name);
        if (attrItem.type == SUBMENU) {
            var subResult = getAttribute(attrItem.values, key);
            if (subResult != null)
                return subResult;
        }
        else if (attrItem.key == key)
            return attrMenu[idx];
        else if (attrItem.cmd == key)
            return attrMenu[idx];
    }
    return null;
}

function getParentAttribute(attrMenu, parent, child) {
    for (let idx in attrMenu) {
        var attrItem = attrMenu[idx];
        if (attrItem.type == PLACEHOLDER)
            attrItem = getPlaceholder(attrItem.name);
        if (attrItem.type == SUBMENU) {
            var subResult = getParentAttribute(attrItem.values, attrItem, child);
            if (subResult != null)
                return subResult;
        }
        else if (attrItem.key == child.key)
            return parent;
    }
    return null;
}

function clickContextMenuItem(menuItem) {
    var close = false;
    var cmd = menuItem.getAttributeNS(null, 'cmd');
    var subCmd = menuItem.parentElement.parentElement.getAttributeNS(null, 'cmd');
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getByUuid(config, uuid);
    var parentLogical = getParentByUuid(config, uuid);
    var parentLayer = parentLogical;
    if (parentLayer != null && parentLayer.hasOwnProperty(WITH) && Array.isArray(parentLayer[WITH])) {
        for (let idx in parentLayer[WITH])
            if (parentLayer[WITH][idx].hasOwnProperty('uuid') && parentLayer[WITH][idx].uuid == uuid) {
                parentLayer = getParentByUuid(config, parentLayer.uuid);
                break;
            }
    }
    var clone = JSON.parse(JSON.stringify(cachedElement));

    var selectedElements = [];
    var selectedSigns = outputSvg.getElementsByClassName('selected');
    for (let i = 0; i < selectedSigns.length; i++) {
        var uuid = selectedSigns[i].getAttributeNS(null, 'uuid');
        var root = getByUuid(config, uuid);
        selectedElements.push(root);
    }
    if (selectedElements.length <= 0)
        selectedElements = [root];

    if (cmd in commmands) {
        var cmdObj = commmands[cmd];
        if (subCmd != null)
            cmdObj = cmdObj[subCmd];
        cmdObj = Object.create(cmdObj);
        cmdObj.key = key;
        cmdObj.selectedElements = selectedElements;
        cmdObj.parentLogical = parentLogical;
        cmdObj.parentLayer = parentLayer;
        if (cmdObj.isExecuteable())
            close = cmdObj.execute();
    }
    else
        switch (cmd) {
            case CMD_PASTE_SUB:
                insertSub(root, parentLogical, clone);
                close = true;
                break;
            case CMD_PASTE_WITH:
                delete clone.sub;
                delete clone.with;
                insertWith(root, parentLogical, clone);
                close = true;
                break;
            case CMD_PASTE_SIBLING:
                insertSibling(parentLayer, clone);
                close = true;
                break;
            case CMD_PASTE_PARENT:
                delete clone.sub;
                delete clone.with;
                insertParent(root, parentLogical, parentLayer, clone);
                close = true;
                break;
            case CMD_NEW_ORG:
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
                root.org = newOrgKey;
                root.colorPrimary = newOrgColorPrimary;
                root.colorAccent = newOrgColorAccent;
                close = true;
                break;
            case CMD_SET_STAFF:
                var newStaffTxt = prompt('Stärke', toText(getStaff(root)));
                var newStaff = toStaff(newStaffTxt);
                if (newStaff == null || newStaff.length != 4) {
                    alert('Ungültiges Format');
                    close = true;
                    break;
                }
                if (newStaff[0] + newStaff[1] + newStaff[2] != newStaff[3])
                    alert(`Validierung fehlgeschlagen!\n${newStaff[0]} + ${newStaff[1]} + ${newStaff[2]} != ${newStaff[3]}`);
                else
                    root.staff = newStaff;
                root.show_staff = true;
                close = true;
                break;
            case CMD_RESET_STAFF:
                delete root.staff;
                close = true;
                break;
            case CMD_COLLAPSE:
                if (root.sub == null)
                    break;
                var collapseSign = root.sub.find(item => item.sign == 'Collapsed');
                if (root.sign == 'Collapsed' || collapseSign != null)
                    break;
                collapseSign = {
                    "sign": "Collapsed",
                    "txt": "[...]",
                    "sub": root.sub
                };
                var staff = getStaff(collapseSign);
                if (staff[0] > 0 || staff[1] > 0 || staff[2] > 0 || staff[3] > 0)
                    collapseSign.show_staff = true;
                root.sub = [collapseSign];
                close = true;
                break;
            case CMD_DECOLLAPSE:
                if (root.sign == 'Collapsed') {
                    var parent = getParentByUuid(config, root.uuid);
                    if (parent == null)
                        break;
                    parent.sub = root.sub;
                }
                else if (root.sub != null) {
                    var collapseSign = root.sub.find(item => item.sign == 'Collapsed');
                    if (collapseSign == null)
                        break;
                    root.sub = collapseSign.sub;
                }
                close = true;
                break;
            default:
                var attrMenu = JSON.parse(getResource(`/menus/${root.sign}.json`));
                var attr = null;
                if (key != null && key != "undefined") {
                    attr = getAttribute(attrMenu, key);
                    if (attr == null) {
                        var defaultMenu = JSON.parse(getResource('/menus/menu_default.json'));
                        attr = getAttribute(defaultMenu, key);
                        if (attr == null) {
                            var staffMenu = JSON.parse(getResource('/menus/menu_staff.json'));
                            attr = getAttribute(staffMenu.values, key);
                            if (attr == null) {
                                attr = customOrgs.find(item => item.key == key);
                                if (attr != null) {
                                    attrMenu = [
                                        {
                                            "name": "Organisationen",
                                            "type": "submenu",
                                            "key": "org",
                                            "values": customOrgs
                                        }
                                    ];
                                }
                            }
                        }
                    }
                }
                else
                    attr = getAttribute(attrMenu, cmd);
                if (attr == null)
                    return false;
                if (key != null && key != "undefined")
                    switch (attr.type) {
                        case BOOL:
                            if (root[key])
                                delete root[key];
                            else
                                root[key] = true;
                            close = true;
                            break;
                        case RADIO:
                            var parentAttr = getParentAttribute(attrMenu, null, attr);
                            if (parentAttr.key != null)
                                root[parentAttr.key] = attr.key;
                            else
                                for (let idx in parentAttr.values)
                                    if (parentAttr.values[idx].key == attr.key)
                                        root[parentAttr.values[idx].key] = true;
                                    else
                                        delete root[parentAttr.values[idx].key];
                            close = true;
                            break;
                        case STRING:
                            let newValue = prompt(attr['name'], root[key]);
                            if (newValue == undefined)
                                return;
                            root[key] = newValue;
                            close = true;
                            break;
                    }
                if (attr.implicitAttritbues != null) {
                    for (let idx in attr.implicitAttritbues)
                        if (!attr.implicitAttritbues[idx])
                            delete root[idx];
                        else
                            root[idx] = attr.implicitAttritbues[idx];
                    close = true;
                }
                if (attr.conditionalAttritbues != null) {
                    var match = true;
                    for (let idx in attr.conditionalAttritbues.condition)
                        match &= root[idx] == attr.conditionalAttritbues.condition[idx];
                    if (match)
                        for (let idx in attr.conditionalAttritbues.values)
                            if (!attr.conditionalAttritbues.values[idx])
                                delete root[idx];
                            else
                                root[idx] = attr.conditionalAttritbues.values[idx];
                    close = true;
                }
                break;
        }
    if (close)
        draw();
    return close;
}