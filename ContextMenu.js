const SUBMENU = 'submenu';
const BOOL = 'bool';
const STRING = 'string';
const COLOR = 'color';

function buildMenu(root, attrMenu) {
    var menuItems = [];
    for (let idx in attrMenu) {
        var menuItem = document.createElement('li');
        menuItem.classList.add('context-menu-item');
        if (attrMenu[idx]['type'] != SUBMENU)
            menuItem.setAttribute('key', attrMenu[idx]['key']);
        switch (attrMenu[idx]['type']) {
            case SUBMENU:
                menuItem.classList.add('with-submenu');
                menuItem.appendChild(document.createTextNode(`${attrMenu[idx]['name']}`));
                var subMenu = document.createElement('ul');
                subMenu.classList.add('sub-menu');
                var subMenuItems = buildMenu(root, attrMenu[idx]['values']);
                subMenu.replaceChildren(...subMenuItems);
                menuItem.appendChild(subMenu);
                break;
            case BOOL:
                menuItem.appendChild(document.createTextNode(`${root[attrMenu[idx]['key']] == true ? '>\t' : '\t'} \t${attrMenu[idx]['name']}`));
                break;
            case STRING:
                menuItem.appendChild(document.createTextNode(`\t${attrMenu[idx]['name']}: ${root[attrMenu[idx]['key']]}`));
                break;
            case COLOR:
                menuItem.appendChild(document.createTextNode(`\t${attrMenu[idx]['name']}: ${root[attrMenu[idx]['key']]}`));
                break;
        }
        menuItems.push(menuItem);
    }
    return menuItems;
}

function openSignContextMenu(evt, sign) {
    var uuid = sign.getAttributeNS(null, 'uuid');
    var root = getConfigElementByUuid(config, uuid);

    var attrMenu = JSON.parse(getResource(`/attributes/${root['sign']}.json`));
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
    if(menuItem.parentElement.classList.contains('sub-menu'))
        return getUuidOfContextMenu(menuItem.parentElement.parentElement);
    return menuItem.parentElement.getAttributeNS(null, 'uuid');
}

function clickContextMenuItem(menuItem) {
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getConfigElementByUuid(config, uuid);
    if (root[key]) {
        if (typeof root[key] === 'boolean')
            delete root[key];
    }
    else
        root[key] = true;
    draw();
}