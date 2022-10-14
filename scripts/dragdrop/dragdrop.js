function pointerOverSvg(uuid) {
    hoveringUuid = uuid;
}

function pointerOutSvg(uuid) {
    if (hoveringUuid == uuid) {
        hoveringUuid = null;
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
    draggingElement.classList.add('draggedElement');

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
    if (hoveringUuid != null && draggedElement != null) {
        var source = getParentByUuid(config, draggedElement.draggingInfo.uuid);
        var subject = getByUuid(config, draggedElement.draggingInfo.uuid);
        var target = getByUuid(config, hoveringUuid);
        var targetParent = getParentByUuid(config, hoveringUuid);

        if (target != null
            && source != null
            && subject != target
            && !isAncestorOf(target, subject)) {
            if (targetParent != null && targetParent.with != null && targetParent.with.includes(target))
                target = targetParent;
            if (!evt.ctrlKey && source.sub != null)
                source.sub = source.sub.filter(item => item != subject);
            if (!evt.ctrlKey && source.with != null)
                source.with = source.with.filter(item => item != subject);

            if (evt.ctrlKey)
                subject = JSON.parse(JSON.stringify(subject));
            if (evt.shiftKey) {
                if (target.with == null)
                    target.with = [subject];
                else
                    target.with.push(subject);
            } else {
                if (target.sub == null)
                    target.sub = [subject];
                else
                    target.sub.push(subject);
            }
        }
    }
    if (draggedElement) {
        draggedElement.classList.remove('draggedElement');
        draw();
    }
}