const SUBMENU = 'submenu';
const PLACEHOLDER = 'placeholder';
const BOOL = 'bool';
const RADIO = 'radio';
const CMD = 'cmd';
const STRING = 'string';
const HEADER = 'header';

var cachedElement = null;
var commmands = {
    'copy': new CopyCmd(),
    'add_parent': new AddParentCmd(),
    'add_sibling': new AddSibCmd(),
    'add_sub': new AddSubCmd(),
    'add_with': new AddWithCmd(),
    'cut_single': new CutSingleCmd(),
    'cut_tree': new CutTreeCmd(),
    'delete_single': new DeleteSingleCmd(),
    'delete_tree': new DeleteTreeCmd(),
    'paste_parent_single': new PasteParentCmd(),
    'paste_sibling_single': new PasteSibCmd(true),
    'paste_sibling_tree': new PasteSibCmd(false),
    'paste_sub_single': new PasteSubCmd(true),
    'paste_sub_tree': new PasteSubCmd(false),
    'paste_with_single': new PasteWithCmd(),
    'new_org': new NewOrgCmd(),
    'set_staff': new SetStaffCmd(),
    'reset_staff': new ResetStaffCmd(),
    'collapse': new CollapseCmd(),
    'decollapse': new DecollapseCmd(),
};

var currentSignMenu = null;

function getPlaceholder(name) {
    if (name == 'CustomOrgs')
        return customOrgs;
    else
        return JSON.parse(getResource(`/menus/${name}.json`))
}

function getIcon(iconPath) {
    var link = false;
    if (typeof iconPath == "object") {
        iconPath = iconPath.src;
        if (iconPath.link != null)
            link = iconPath.link;
    }
    if (iconPath == null)
        iconPath = '/signs/Empty.svg';
    if (!iconPath.endsWith('.svg'))
        link = true;
    if (link) {
        var iconImg = document.createElement('img');;
        iconImg.setAttribute('src', iconPath);
        return iconImg;
    }
    else if (iconPath.endsWith('.svg')) {
        var iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var para = {
            'width': 25,
            'height': 25
        };
        var iconSvgText = getSign({
            'sign': iconPath,
            'colorAccent': '#000'
        });
        var icon = new DOMParser().parseFromString(iconSvgText, "text/xml").getElementsByTagName("svg")[0];
        var symbolWidth = parseInt(icon.getAttributeNS(null, 'width'));
        var symbolHeight = parseInt(icon.getAttributeNS(null, 'height'));
        var scale = Math.floor(Math.min(para.width / symbolWidth, para.height / symbolHeight) * 100) / 100;
        var posOffsetX = symbolWidth * scale / 2;
        var posOffsetY = symbolHeight * scale / 2;
        var iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        iconG.setAttribute('transform', `translate(${para.width / 2 - posOffsetX}, ${para.height / 2 - posOffsetY}) scale(${scale} ${scale})`);
        iconG.innerHTML = icon.outerHTML;

        var reScaleable = /scale\:(\d+)/g;
        var scaleable = reScaleable.exec(iconG.innerHTML);
        while (scaleable) {
            iconG.innerHTML = iconG.innerHTML.slice(0, scaleable.index)
                + (parseInt(scaleable[1]) / scale / 3).toString()
                + iconG.innerHTML.slice(scaleable.index + scaleable[0].length);
            scaleable = reScaleable.exec(iconG.innerHTML);
        }

        iconSvg.innerHTML = iconG.outerHTML;
        return iconSvg;
    }
    return null;
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
    var attrItems = [];

    var icon = getIcon(attrItem.icon);
    if (icon != null)
        menuItem.appendChild(icon);

    if (attrItem.styles != null)
        for (let idx in attrItem.styles)
            menuItem.classList.add(attrItem.styles[idx]);

    if (attrItem.cmd != null) {
        menuItem.setAttribute('cmd', attrItem.cmd);
        if (attrItem.cmd in commmands) {
            var cmdObj = commmands[attrItem.cmd];
            cmdObj = Object.create(cmdObj);
            cmdObj.key = key;
            cmdObj.selectedElements = [root];
            if (cmdObj.isExecuteable != null && !cmdObj.isExecuteable()) {
                if (cmdObj.hide)
                    return null;
                menuItem.classList.add('menu-item-inactive');
            }
        }
    }
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
            var subMenuResult = buildMenu(root, attrItem, attrItem.values);
            var subMenuItems = subMenuResult.menuItems;
            if (subMenuItems.every(item => item.classList.contains('menu-item-inactive')))
                menuItem.classList.add('menu-item-inactive');
            if (Array.isArray(attrItem.values)) {
                var selectedItem = attrItem.values.find(item => item.type == 'radio' && (root[item.key] || root[attrItem.key] == item.key));
                if (selectedItem != null) {
                    var newIcon = getIcon(selectedItem.icon);
                    if (newIcon != null)
                        menuItem.replaceChild(newIcon, icon);
                }
            }
            subMenu.replaceChildren(...subMenuItems);
            menuItem.appendChild(subMenu);
            var clonedAttrItem = JSON.parse(JSON.stringify(attrItem));
            clonedAttrItem.attrItems = subMenuResult.attrItems;
            attrItems.push(clonedAttrItem);
            break;
        case BOOL:
        case RADIO:
        case CMD:
            if (content == true || content == attrItem.key) {
                if (attrItem.nameInverted == null) {
                    menuItem.classList.add('menu-item-selected');
                    menuItem.appendChild(document.createTextNode(attrItem.name));
                }
                else {
                    menuItem.appendChild(document.createTextNode(attrItem.nameInverted));
                    var newIcon = getIcon(attrItem.iconInverted);
                    if (newIcon != null)
                        menuItem.replaceChild(newIcon, icon);
                }
            }
            else
                menuItem.appendChild(document.createTextNode(attrItem.name));
            attrItems.push(attrItem);
            break;
        case STRING:
            menuItem.appendChild(document.createTextNode(`\t${attrItem.name}: ${content}`));
            attrItems.push(attrItem);
            break;
        case HEADER:
            var menuItem = document.createElement('li');
            menuItem.classList.add('context-menu-header');
            menuItem.appendChild(document.createTextNode(attrItem.name));
            attrItems.push(attrItem);
            break;
    }
    return {
        'menuItems': menuItem,
        'attrItems': attrItems,
    };
}

function buildMenu(root, parentMenuItem, attrMenu) {
    var menuItems = [];
    var attrItems = [];
    if (Array.isArray(attrMenu) && attrMenu.length > 0)
        for (let idx in attrMenu) {
            var menuItemResult = buildMenuItem(root, parentMenuItem, attrMenu[idx]);
            if (menuItemResult == null)
                continue;
            var menuItem = menuItemResult.menuItems;
            if (Array.isArray(menuItem) && menuItem.length > 0)
                menuItems = menuItems.concat(menuItem);
            else if (menuItem != null)
                menuItems.push(menuItem);
            attrItems = attrItems.concat(menuItemResult.attrItems);
        }
    else {
        var menuItemResult = buildMenuItem(root, parentMenuItem, attrMenu);
        if (menuItemResult != null) {
            var menuItem = menuItemResult.menuItems;
            if (Array.isArray(menuItem) && menuItem.length > 0)
                menuItems = menuItems.concat(menuItem);
            else
                menuItems.push(menuItem);
            attrItems = attrItems.concat(menuItemResult.attrItems);
        }
    }
    return {
        'menuItems': menuItems,
        'attrItems': attrItems,
    };
}

function openSignContextMenu(evt, sign) {
    var uuid = sign.getAttributeNS(null, 'uuid');
    var root = getByUuid(config, uuid);

    var attrMenu = JSON.parse(getResource(`/menus/${root.sign}.json`))
        .concat(JSON.parse(getResource('/menus/menu_default.json')));
    var menuResult = buildMenu(root, null, attrMenu);

    currentSignMenu = menuResult.attrItems;

    var menuItems = document.querySelector('.context-menu .menu');
    menuItems.setAttribute('uuid', uuid);
    menuItems.replaceChildren(...menuResult.menuItems);

    var touchpos = getEvtPos(evt);
    var menu = document.querySelector('.context-menu');
    menu.style.left = touchpos.pageX + "px";
    menu.style.top = touchpos.pageY + "px";
    menu.classList.add('context-menu-active');
}

function closeSignContextMenu() {
    var menu = document.querySelector('.context-menu');
    menu.classList.remove('context-menu-active');
    currentSignMenu = null;
}

function getUuidOfContextMenu(menuItem) {
    if (menuItem.parentElement.classList.contains('sub-menu')
        || menuItem.parentElement.classList.contains('sub-sub-menu'))
        return getUuidOfContextMenu(menuItem.parentElement.parentElement);
    return menuItem.parentElement.getAttributeNS(null, 'uuid');
}

function getAttribute(attrMenu, key, value) {
    var attrItem = attrMenu.find(item => item[key] == value);
    if (attrItem != null)
        return attrItem;

    for (let idx in attrMenu) {
        if (attrMenu[idx].attrItems == null)
            continue;
        var subResult = getAttribute(attrMenu[idx].attrItems, key, value);
        if (subResult != null)
            return subResult;
    }
    return null;
}

function getParentAttribute(attrMenu, parent, child) {
    for (let idx in attrMenu) {
        if (attrMenu[idx] == child)
            return parent;

        if (attrMenu[idx].attrItems == null)
            continue;
        var subResult = getParentAttribute(attrMenu[idx].attrItems, attrMenu[idx], child);
        if (subResult != null)
            return subResult;
    }
    return null;
}

function handleImplicitAttributes(root, attr) {
    for (let idx in attr.implicitAttritbues)
        if (!attr.implicitAttritbues[idx]) {
            if (idx.endsWith('*'))
                for (let prop in root) {
                    if (prop.startsWith(idx.slice(0, idx.length - 2)))
                        delete root[prop];
                }
            else
                delete root[idx];
        }
        else
            root[idx] = attr.implicitAttritbues[idx];
}

function handleConditionalAttributes(root, attr) {
    var match = true;
    for (let idx in attr.conditionalAttritbues.condition)
        match &= root[idx] == attr.conditionalAttritbues.condition[idx];
    if (match)
        for (let idx in attr.conditionalAttritbues.values)
            if (!attr.conditionalAttritbues.values[idx])
                delete root[idx];
            else
                root[idx] = attr.conditionalAttritbues.values[idx];
}

function clickContextMenuItem(menuItem) {
    var close = false;
    var cmd = menuItem.getAttributeNS(null, 'cmd');
    if (cmd == null)
        cmd = menuItem.parentElement.parentElement.getAttributeNS(null, 'cmd');
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = getUuidOfContextMenu(menuItem);
    var root = getByUuid(config, uuid);
    var selectedElements = getSelectedElements();
    if (selectedElements.length <= 0)
        selectedElements = [root];

    if (cmd in commmands) {
        var cmdObj = commmands[cmd];
        cmdObj = Object.create(cmdObj);
        cmdObj.key = key;
        cmdObj.selectedElements = selectedElements;
        if (cmdObj.isExecuteable())
            close = cmdObj.execute();
    }
    else if (currentSignMenu != null) {
        var attr = null;
        if (key != null && key != "undefined")
            attr = getAttribute(currentSignMenu, 'key', key);
        else if (cmd != null)
            attr = getAttribute(currentSignMenu, 'cmd', cmd);
        if (attr == null)
            return false;

        var newString = null;
        if (attr.type == STRING) {
            newString = prompt(attr['name'], root[key]);
            if (newString == undefined)
                return true;
        }

        for (let i = 0; i < selectedElements.length; i++) {
            root = selectedElements[i];
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
                        var parentAttr = getParentAttribute(currentSignMenu, null, attr);
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
                        if (newString == '')
                            delete root[key];
                        else
                            root[key] = newString;
                        close = true;
                        break;
                }
            if (attr.implicitAttritbues != null) {
                handleImplicitAttributes(root, attr);
                close = true;
            }
            if (attr.conditionalAttritbues != null) {
                handleConditionalAttributes(root, attr);
                close = true;
            }
        }
    }
    if (close)
        draw();
    return close;
}