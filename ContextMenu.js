function openSignContextMenu(evt, sign) {
    var uuid = sign.getAttributeNS(null, 'uuid');
    var root = getConfigElementByUuid(config, uuid);
    var svg = getResource(`/signs/${root['sign']}.svg`);
    var re = /\{\{(\w+)/g;
    var newMenuItems = [];
    while (re.global && (match = re.exec(svg))) {
        var key = match[1];
        var prefix = 'X'
        if(root[key])
            prefix = 'OK';
        var menuItem = document.createElement('li');
        menuItem.classList.add('context-menu-item');
        menuItem.setAttribute('key', key);
        menuItem.appendChild(document.createTextNode(`${prefix}\t${key}`));
        newMenuItems.push(menuItem);
    }
    var menuItems = document.querySelector('.context-menu-items');
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

function clickContextMenuItem(menuItem) {
    var key = menuItem.getAttributeNS(null, 'key');
    var uuid = menuItem.parentElement.getAttributeNS(null, 'uuid');
    var root = getConfigElementByUuid(config, uuid);
    if(root[key])
    {
        if(typeof root[key] === 'boolean')
            delete root[key];
    }
    else
        root[key] = true;
    draw();
}