function pointerOverSvg(uuid) {
    hoveringUuid = uuid;
    console.log('over: ' + hoveringUuid);
}

function pointerOutSvg(uuid) {
    if (hoveringUuid == uuid) {
        hoveringUuid = null;
        console.log('out: ' + uuid);
    }
}

function drag(evt) {
    var element = evt.target;
    if (element.nodeName == 'text' && element.getAttributeNS(null, 'uuid') != null)
        return;
    while (element != null && !element.classList.contains('draggable') && element.id != 'outputSvg') {
        element = element.parentElement;
    }
    if (element == null || !element.classList.contains('draggable'))
        return;
    draggingElement = element;

    var canvas = draggingElement.parentElement;
    var canvasChildren = Array.from(canvas.childNodes).filter(item => item != draggingElement);
    canvasChildren.unshift(draggingElement);
    canvas.childNodes = canvasChildren;

    var touchpos = getEvtPos(evt);
    var transform = draggingElement.getAttributeNS(null, 'transform');
    var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);
    if (match == null) {
        draggingElement = null;
        return;
    }
    draggingElement.draggingInfo = {
        offsetX: match[1] - touchpos.clientX,
        offsetY: match[2] - touchpos.clientY,
        scaleX: match[3],
        scaleY: match[4],
        uuid: draggingElement.getAttributeNS(null, 'uuid'),
    };
}

function dragging(evt) {
    if (draggingElement) {
        evt.preventDefault();
        var touchpos = getEvtPos(evt);
        draggingElement.setAttributeNS(null, 'transform', `translate(${touchpos.clientX + draggingElement.draggingInfo.offsetX}, ${touchpos.clientY + draggingElement.draggingInfo.offsetY}) scale(${draggingElement.draggingInfo.scaleX} ${draggingElement.draggingInfo.scaleY})`);
    }
}

function drop(evt) {
    var draggedElement = draggingElement;
    draggingElement = null;
    if (hoveringUuid != null) {
        var source = getParentByUuid(config, draggedElement.draggingInfo.uuid);
        var subject = getByUuid(config, draggedElement.draggingInfo.uuid);
        var target = getByUuid(config, hoveringUuid);

        if (subject == target || isAncestorOf(target, subject))
            return;

        if (target != null && source != null) {
            source.sub = source.sub.filter(item => item != subject);
            if (target.sub == null)
                target.sub = [subject];
            else
                target.sub.push(subject);
        }
    }
    if (draggedElement)
        draw();
}