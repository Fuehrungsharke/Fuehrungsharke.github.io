import { getEvtPos } from '../events.mjs';
import { getByUuid } from '../utils.mjs';
import { config } from '../config.mjs';
import { getResourceAsync } from '../resource_manager.mjs';
import { getSign } from '../canvas.mjs';

import CopyCmd from '../commands/copy.mjs';
import AddParentCmd from '../commands/add_parent.mjs';
import AddSibCmd from '../commands/add_sib.mjs';
import AddSubCmd from '../commands/add_sub.mjs';
import AddWithCmd from '../commands/add_with.mjs';
import CutSingleCmd from '../commands/cut_single.mjs';
import CutTreeCmd from '../commands/cut_tree.mjs';
import DeleteSingleCmd from '../commands/delete_single.mjs';
import DeleteTreeCmd from '../commands/delete_tree.mjs';
import PasteParentCmd from '../commands/paste_parent.mjs';
import PasteSibCmd from '../commands/paste_sib.mjs';
import PasteSubCmd from '../commands/paste_sub.mjs';
import PasteWithCmd from '../commands/paste_with.mjs';
import NewOrgCmd, { customOrgs } from '../commands/new_org.mjs';
import SetStaffCmd from '../commands/set_staff.mjs';
import ResetStaffCmd from '../commands/reset_staff.mjs';
import CollapseCmd from '../commands/collapse.mjs';
import DecollapseCmd from '../commands/decollapse.mjs';

const SUBMENU = 'submenu';
const PLACEHOLDER = 'placeholder';
const BOOL = 'bool';
const RADIO = 'radio';
const CMD = 'cmd';
const STRING = 'string';
const HEADER = 'header';

let cachedElement = null;
let commmands = {
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

let currentSignMenu = null;

async function getPlaceholder(name) {
    if (name == 'CustomOrgs')
        return customOrgs;
    else
        return JSON.parse(await getResourceAsync(`/menus/${name}.json`))
}

async function getIcon(iconPath, root) {
    let link = false;
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
        let iconImg = document.createElement('img');;
        iconImg.setAttribute('src', iconPath);
        return iconImg;
    }
    else if (iconPath.endsWith('.svg')) {
        let iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let para = {
            'width': 25,
            'height': 25
        };
        let iconSvgText = await getSign({
            'sign': iconPath,
            'colorAccent': '#000'
        });
        let icon = new DOMParser().parseFromString(iconSvgText, "text/xml").getElementsByTagName("svg")[0];
        let symbolWidth = parseInt(icon.getAttributeNS(null, 'width'));
        let symbolHeight = parseInt(icon.getAttributeNS(null, 'height'));
        let scale = Math.floor(Math.min(para.width / symbolWidth, para.height / symbolHeight) * 100) / 100;
        let posOffsetX = symbolWidth * scale / 2;
        let posOffsetY = symbolHeight * scale / 2;
        let iconG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        iconG.setAttribute('transform', `translate(${para.width / 2 - posOffsetX}, ${para.height / 2 - posOffsetY}) scale(${scale} ${scale})`);
        iconG.innerHTML = icon.outerHTML;

        let reScaleable = /scale\:(\d+)/g;
        let scaleable = reScaleable.exec(iconG.innerHTML);
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

async function buildMenuItem(root, parentMenuItem, attrItem) {
    if (attrItem.type == PLACEHOLDER) {
        attrItem = await getPlaceholder(attrItem.name);
        if (Array.isArray(attrItem))
            if (attrItem.length > 0)
                return buildMenu(root, parentMenuItem, attrItem);
            else
                return null;
    }
    let menuItemChildrenPromises = [getIcon(attrItem.icon)];
    let key = attrItem.key;
    let menuItem = document.createElement('li');
    menuItem.classList.add('context-menu-item');
    let attrItems = [];

    if (attrItem.styles != null)
        for (let idx in attrItem.styles)
            menuItem.classList.add(attrItem.styles[idx]);

    if (attrItem.cmd != null) {
        menuItem.setAttribute('cmd', attrItem.cmd);
        if (attrItem.cmd in commmands) {
            let cmdObj = commmands[attrItem.cmd];
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
    let content = '';
    if (root != null && root[key] != null)
        content = root[key];
    switch (attrItem.type) {
        case SUBMENU:
            menuItem.classList.add('with-submenu');
            menuItemChildrenPromises.push(Promise.resolve(document.createTextNode(`${attrItem.name}`)));
            let subMenu = document.createElement('ul');
            if (parentMenuItem != null && parentMenuItem.type == SUBMENU)
                subMenu.classList.add('sub-sub-menu');
            else
                subMenu.classList.add('sub-menu');
            let subMenuResult = await buildMenu(root, attrItem, attrItem.values);
            let subMenuItems = subMenuResult.menuItems;
            if (subMenuItems.every(item => item.classList.contains('menu-item-inactive')))
                menuItem.classList.add('menu-item-inactive');
            if (Array.isArray(attrItem.values)) {
                let selectedItem = attrItem.values.find(item => item.type == 'radio' && (root[item.key] || root[attrItem.key] == item.key));
                if (selectedItem != null) {
                    let newIcon = getIcon(selectedItem.icon);
                    menuItemChildrenPromises[0] = newIcon;
                }
            }
            subMenu.replaceChildren(...subMenuItems);
            menuItemChildrenPromises.push(Promise.resolve(subMenu));
            let clonedAttrItem = JSON.parse(JSON.stringify(attrItem));
            clonedAttrItem.attrItems = subMenuResult.attrItems;
            attrItems.push(clonedAttrItem);
            break;
        case BOOL:
        case RADIO:
        case CMD:
            if (content == true || content == attrItem.key) {
                if (attrItem.nameInverted == null) {
                    menuItem.classList.add('menu-item-selected');
                    menuItemChildrenPromises.push(Promise.resolve(document.createTextNode(attrItem.name)));
                }
                else {
                    menuItemChildrenPromises.push(Promise.resolve(document.createTextNode(attrItem.nameInverted)));
                    let newIcon = getIcon(attrItem.iconInverted);
                    menuItemChildrenPromises[0] = newIcon;
                }
            }
            else
                menuItemChildrenPromises.push(Promise.resolve(document.createTextNode(attrItem.name)));
            attrItems.push(attrItem);
            break;
        case STRING:
            menuItemChildrenPromises.push(Promise.resolve(document.createTextNode(`\t${attrItem.name}: ${content}`)));
            attrItems.push(attrItem);
            break;
        case HEADER:
            menuItem = document.createElement('li');
            menuItem.classList.add('context-menu-header');
            menuItemChildrenPromises = [Promise.resolve(document.createTextNode(attrItem.name))];
            attrItems.push(attrItem);
            break;
    }

    let menuItemChildren = await Promise.all(menuItemChildrenPromises);
    for (let idx in menuItemChildren)
        menuItem.appendChild(menuItemChildren[idx]);

    return {
        'menuItems': menuItem,
        'attrItems': attrItems,
    };
}

async function buildMenu(root, parentMenuItem, attrMenu) {
    let menuItems = [];
    let attrItems = [];
    if (Array.isArray(attrMenu) && attrMenu.length > 0) {
        let menuPromises = attrMenu.map(item => buildMenuItem(root, parentMenuItem, item));
        let menuItemResults = await Promise.all(menuPromises);
        for (let idx in menuItemResults) {
            if (menuItemResults[idx] == null)
                continue;
            let menuItem = menuItemResults[idx].menuItems;
            if (Array.isArray(menuItem) && menuItem.length > 0)
                menuItems = menuItems.concat(menuItem);
            else if (menuItem != null)
                menuItems.push(menuItem);
            attrItems = attrItems.concat(menuItemResults[idx].attrItems);
        }
    }
    else {
        let menuItemResult = await buildMenuItem(root, parentMenuItem, attrMenu);
        if (menuItemResult != null) {
            let menuItem = menuItemResult.menuItems;
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

export async function openSignContextMenu(evt, sign) {
    let uuid = sign.getAttributeNS(null, 'uuid');
    let root = getByUuid(config, uuid);

    let attrMenu = JSON.parse(await getResourceAsync(`/menus/${root.sign}.json`))
        .concat(JSON.parse(await getResourceAsync('/menus/menu_default.json')));
    let menuResult = await buildMenu(root, null, attrMenu);

    currentSignMenu = menuResult.attrItems;

    let menuItems = document.querySelector('.context-menu .menu');
    menuItems.setAttribute('uuid', uuid);
    menuItems.replaceChildren(...menuResult.menuItems);

    let touchpos = getEvtPos(evt);
    let menu = document.querySelector('.context-menu');
    menu.style.left = touchpos.pageX + "px";
    menu.style.top = touchpos.pageY + "px";
    menu.classList.add('context-menu-active');
}

export function closeSignContextMenu() {
    let menu = document.querySelector('.context-menu');
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
    let attrItem = attrMenu.find(item => item[key] == value);
    if (attrItem != null)
        return attrItem;

    for (let idx in attrMenu) {
        if (attrMenu[idx].attrItems == null)
            continue;
        let subResult = getAttribute(attrMenu[idx].attrItems, key, value);
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
        let subResult = getParentAttribute(attrMenu[idx].attrItems, attrMenu[idx], child);
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
    let match = true;
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
    let close = false;
    let cmd = menuItem.getAttributeNS(null, 'cmd');
    if (cmd == null)
        cmd = menuItem.parentElement.parentElement.getAttributeNS(null, 'cmd');
    let key = menuItem.getAttributeNS(null, 'key');
    let uuid = getUuidOfContextMenu(menuItem);
    let root = getByUuid(config, uuid);
    let selectedElements = getSelectedElements();
    if (selectedElements.length <= 0)
        selectedElements = [root];

    if (cmd in commmands) {
        let cmdObj = commmands[cmd];
        cmdObj = Object.create(cmdObj);
        cmdObj.key = key;
        cmdObj.selectedElements = selectedElements;
        if (cmdObj.isExecuteable())
            close = cmdObj.execute();
    }
    else if (currentSignMenu != null) {
        let attr = null;
        if (key != null && key != "undefined")
            attr = getAttribute(currentSignMenu, 'key', key);
        else if (cmd != null)
            attr = getAttribute(currentSignMenu, 'cmd', cmd);
        if (attr == null)
            return false;

        let newString = null;
        if (attr.type == STRING) {
            newString = prompt(attr['name'], root[key]);
            if (newString == undefined)
                return true;
        }

        for (const selectedElement of selectedElements) {
            root = selectedElement;
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
                        let parentAttr = getParentAttribute(currentSignMenu, null, attr);
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