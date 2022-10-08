const SUBMENU = 'submenu';
const PLACEHOLDER = 'placeholder';
const BOOL = 'bool';
const RADIO = 'radio';
const CMD = 'cmd';
const STRING = 'string';
const HEADER = 'header';
const CMD_ADD = 'add';
const CMD_ADD_SUB = 'add_sub';
const CMD_ADD_WITH = 'add_with';
const CMD_ADD_SIBLING = 'add_sibling';
const CMD_ADD_PARENT = 'add_parent';
const CMD_REMOVE = 'remove';

function buildMenuItem(root, parentMenuItem, attrItem) {
    if (attrItem.type == PLACEHOLDER) {
        attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
        if (Array.isArray(attrItem) && attrItem.length > 0)
            return buildMenu(root, parentMenuItem, attrItem);
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
            var isSelected = content == true || content == attrItem.key;
            menuItem.appendChild(document.createTextNode(`${isSelected ? '>\t' : '\t'} \t${attrItem.name}`));
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
            else
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

    var attrMenu = JSON.parse(getResource(`/attributes/${root.sign}.json`));
    var newMenuItems = buildMenu(root, null, attrMenu);

    var menuHeaderItem = document.createElement('li');
    menuHeaderItem.classList.add('context-menu-header');
    newMenuItems.push(menuHeaderItem);

    var menuItemsAdd = buildMenu(root, null, JSON.parse(getResource('/attributes/menu_add.json')));
    newMenuItems.push(menuItemsAdd[0]);

    var menuItemRemove = document.createElement('li');
    menuItemRemove.classList.add('context-menu-item');
    menuItemRemove.setAttribute('cmd', CMD_REMOVE);
    menuItemRemove.appendChild(document.createTextNode('Entfernen'));
    newMenuItems.push(menuItemRemove);

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
            attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
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
            attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
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
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getByUuid(config, uuid);
    switch (cmd) {
        case CMD_ADD:
            var newObj = {
                'sign': key,
                'colorPrimary': '#FFFFFF',
                'colorAccent': '#000000'
            };
            var parentLocical = getParentByUuid(config, uuid);
            var parentLayer = parentLocical;
            if (parentLayer != null && parentLayer.hasOwnProperty(WITH) && Array.isArray(parentLayer[WITH])) {
                for (let idx in parentLayer[WITH])
                    if (parentLayer[WITH][idx].hasOwnProperty('uuid') && parentLayer[WITH][idx].uuid == uuid) {
                        parentLayer = getParentByUuid(config, parentLayer.uuid);
                        break;
                    }
            }
            var subCmd = menuItem.parentElement.parentElement.getAttributeNS(null, 'cmd');
            switch (subCmd) {
                case CMD_ADD_WITH:
                    if (parentLocical != null && parentLocical[WITH] != null && parentLocical[WITH].indexOf(root) >= 0)
                        parentLocical[WITH].push(newObj);
                    else {
                        if (root[WITH] == null)
                            root[WITH] = [];
                        root[WITH].push(newObj);
                    }
                    close = true;
                    break;
                case CMD_ADD_SIBLING:
                    if (parentLayer != null) {
                        if (Array.isArray(parentLayer) && parentLayer.length > 0)
                            parentLayer.push(newObj);
                        else if (parentLayer[SUB] != null)
                            parentLayer[SUB].push(newObj);
                    } else
                        config = [config, newObj];
                    close = true;
                    break;
                case CMD_ADD_PARENT:
                    if (parentLayer != null) {
                        if (Array.isArray(parentLayer) && parentLayer.length > 0) {
                            newObj[SUB] = parentLayer;
                            config = newObj;
                        }
                        else if (parentLayer[SUB] != null) {
                            if (parentLayer == parentLocical) {
                                parentLayer[SUB] = parentLayer[SUB].filter(item => item != root);
                                newObj[SUB] = [root];
                            } else {
                                parentLayer[SUB] = parentLayer[SUB].filter(item => item != parentLocical);
                                newObj[SUB] = [parentLocical];
                            }
                            parentLayer[SUB].push(newObj);
                        }
                    }
                    else {
                        newObj[SUB] = [config];
                        config = newObj;
                    }
                    close = true;
                    break;
                case CMD_ADD_SUB:
                    if (parentLocical != null && parentLocical[WITH] != null && parentLocical[WITH].indexOf(root) >= 0) {
                        if (parentLocical[SUB] == null)
                            parentLocical[SUB] = [];
                        parentLocical[SUB].push(newObj);
                    }
                    else {
                        if (root[SUB] == null)
                            root[SUB] = [];
                        root[SUB].push(newObj);
                    }
                    close = true;
                    break;
            }
            break;
        case CMD_REMOVE:
            var source = getParentByUuid(config, uuid);
            if (source != null) {
                if (source.hasOwnProperty(SUB) && Array.isArray(source[SUB])) {
                    source.sub = source.sub.filter(item => item != root);
                    if (source.sub.length == 0)
                        delete source.sub;
                }
                if (source.hasOwnProperty(WITH) && Array.isArray(source[WITH])) {
                    source.with = source.with.filter(item => item != root);
                    if (source.with.length == 0)
                        delete source.with;
                }
                close = true;
            }
            break;
        default:
            var attrMenu = JSON.parse(getResource(`/attributes/${root.sign}.json`));
            var attr = null;
            if (key != null && key != "undefined")
                attr = getAttribute(attrMenu, key);
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
            break;
    }
    if (close)
        draw();
    return close;
}