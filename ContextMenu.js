const SUBMENU = 'submenu';
const PLACEHOLDER = 'placeholder';
const BOOL = 'bool';
const RADIO = 'radio';
const STRING = 'string';
const COLOR = 'color';

function buildMenu(root, attrMenu) {
    var menuItems = [];
    for (let idx in attrMenu) {
        var attrItem = attrMenu[idx];
        if(attrItem.type == PLACEHOLDER)
            attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
        var key = attrItem.key;
        var content = root[key];
        if (content == null)
            content = '';
        var menuItem = document.createElement('li');
        menuItem.classList.add('context-menu-item');
        if (attrItem.type != SUBMENU)
            menuItem.setAttribute('key', key);
        switch (attrItem.type) {
            case SUBMENU:
                menuItem.classList.add('with-submenu');
                menuItem.appendChild(document.createTextNode(`${attrItem.name}`));
                var subMenu = document.createElement('ul');
                subMenu.classList.add('sub-menu');
                var subMenuItems = buildMenu(root, attrItem.values);
                subMenu.replaceChildren(...subMenuItems);
                menuItem.appendChild(subMenu);
                break;
            case BOOL:
            case RADIO:
                menuItem.appendChild(document.createTextNode(`${content == true ? '>\t' : '\t'} \t${attrItem.name}`));
                break;
            case STRING:
                menuItem.appendChild(document.createTextNode(`\t${attrItem.name}: ${content}`));
                break;
            case COLOR:
                menuItem.appendChild(document.createTextNode(`\t${attrItem.name}: ${content}`));
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
    var newMenuItems = buildMenu(root, attrMenu);

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
        if(attrItem.type == PLACEHOLDER)
            attrItem = JSON.parse(getResource(`/attributes/${attrItem.name}.json`));
        if (attrItem.type == SUBMENU) {
            var subResult = getAttribute(attrItem.values, key);
            if (subResult != null)
                return subResult;
        }
        else if (attrItem.key == key)
            return attrMenu[idx];
    }
    return null;
}

function getParentAttribute(attrMenu, parent, child) {
    for (let idx in attrMenu) {
        var attrItem = attrMenu[idx];
        if(attrItem.type == PLACEHOLDER)
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
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getConfigElementByUuid(config, uuid);
    var attrMenu = JSON.parse(getResource(`/attributes/${root.sign}.json`));
    var attr = getAttribute(attrMenu, key);
    switch (attr.type) {
        case BOOL:
            if (root[key])
                delete root[key];
            else
                root[key] = true;
            break;
        case RADIO:
            var parentAttr = getParentAttribute(attrMenu, null, attr);
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
    draw();
}