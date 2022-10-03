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
const CMD_REMOVE = 'remove';

function buildMenu(root, parentMenuItem, attrMenu) {
    var menuItems = [];
    for (let idx in attrMenu) {
        var attrItem = attrMenu[idx];
        if (attrItem.type == PLACEHOLDER)
            attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
        var key = attrItem.key;
        var menuItem = document.createElement('li');
        menuItem.classList.add('context-menu-item');

        if (attrItem.icon != null) {
            var icon = document.createElement('i');
            icon.classList.add(attrItem.icon);
            menuItem.appendChild(icon);
        }

        if (attrItem.cmd != null)
            menuItem.setAttribute('cmd', attrItem.cmd);
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
        menuItems.push(menuItem);
    }
    return menuItems;
}

function openSignContextMenu(evt, sign) {
    var uuid = sign.getAttributeNS(null, 'uuid');
    var root = getConfigElementByUuid(config, uuid);

    var attrMenu = JSON.parse(getResource(`/attributes/${root.sign}.json`));
    var newMenuItems = buildMenu(root, null, attrMenu);

    var menuHeaderItem = document.createElement('li');
    menuHeaderItem.classList.add('context-menu-header');
    newMenuItems.push(menuHeaderItem);

    var menuItemsSign = buildMenu(null, null, JSON.parse(getResource('/scripts/contextmenu/menu_signs.json')));
    var menuItemSubList = document.createElement('ul');
    menuItemSubList.classList.add('sub-menu')
    menuItemSubList.replaceChildren(...menuItemsSign);
    var menuItemAddSub = document.createElement('li');
    menuItemAddSub.classList.add('context-menu-item');
    menuItemAddSub.classList.add('with-submenu')
    menuItemAddSub.setAttribute('cmd', CMD_ADD_SUB);
    menuItemAddSub.appendChild(document.createTextNode('Neu, untergeordnet'));
    menuItemAddSub.appendChild(menuItemSubList);
    newMenuItems.push(menuItemAddSub);

    var menuItemsSign = buildMenu(null, null, JSON.parse(getResource('/scripts/contextmenu/menu_signs.json')));
    var menuItemSubList = document.createElement('ul');
    menuItemSubList.classList.add('sub-menu')
    menuItemSubList.replaceChildren(...menuItemsSign);
    var menuItemAddSub = document.createElement('li');
    menuItemAddSub.classList.add('context-menu-item');
    menuItemAddSub.classList.add('with-submenu')
    menuItemAddSub.setAttribute('cmd', CMD_ADD_WITH);
    menuItemAddSub.appendChild(document.createTextNode('Neu, nebenstehend'));
    menuItemAddSub.appendChild(menuItemSubList);
    newMenuItems.push(menuItemAddSub);

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
    menu.style.left = touchpos.clientX + "px";
    menu.style.top = touchpos.clientY + "px";
    menu.classList.add('context-menu-active');
}

function closeSignContextMenu() {
    var menu = document.querySelector('.context-menu');
    menu.classList.remove('context-menu-active');
}

function getUuidOfContextMenu(menuItem) {
    if (menuItem.parentElement.classList.contains('sub-menu'))
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
    var cmd = menuItem.getAttributeNS(null, 'cmd');
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getConfigElementByUuid(config, uuid);
    switch (cmd) {
        case CMD_ADD:
            var newObj = {
                'sign': key,
            };
            var parent = getConfigElementParentByUuid(config, uuid);
            var subCmd = menuItem.parentElement.parentElement.getAttributeNS(null, 'cmd');
            switch (subCmd) {
                case CMD_ADD_SUB:
                    if (parent != null && parent[WITH] != null && parent[WITH].indexOf(root) >= 0) {
                        if (parent[SUB] == null)
                            parent[SUB] = [];
                        parent[SUB].push(newObj);
                    }
                    else {
                        if (root[SUB] == null)
                            root[SUB] = [];
                        root[SUB].push(newObj);
                    }
                    break;
                case CMD_ADD_WITH:
                    if (parent != null && parent[WITH] != null && parent[WITH].indexOf(root) >= 0)
                        parent[WITH].push(newObj);
                    else {
                        if (root[WITH] == null)
                            root[WITH] = [];
                        root[WITH].push(newObj);
                    }
                    break;
            }
            break;
        case CMD_REMOVE:
            var source = getConfigElementParentByUuid(config, uuid);
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
            }
            break;
        default:
            var attrMenu = JSON.parse(getResource(`/attributes/${root.sign}.json`));
            var attr = null;
            if (key != "undefined")
                attr = getAttribute(attrMenu, key);
            else
                attr = getAttribute(attrMenu, cmd);
            if (attr == null)
                return;
            switch (attr.type) {
                case BOOL:
                    if (root[key])
                        delete root[key];
                    else
                        root[key] = true;
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
                    break;
                case STRING:
                    let newValue = prompt(attr['name'], root[key]);
                    if (newValue == undefined)
                        return;
                    root[key] = newValue;
                    break;
            }
            if (attr.implicitAttritbues != null) {
                for (let idx in attr.implicitAttritbues)
                    root[idx] = attr.implicitAttritbues[idx];
            }
            break;
    }
    draw();
}