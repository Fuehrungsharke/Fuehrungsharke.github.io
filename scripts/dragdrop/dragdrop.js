var selectionStartPos = null;
var selectionRect = document.getElementById("selectionRect");

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
    var touchpos = getEvtPos(evt);
    if (element == null || !element.classList.contains('draggable')) {
        selectionStartPos = touchpos;
        return;
    }
    draggingElement = element;
    draggingElement.classList.add('draggedElement');

    var canvas = draggingElement.parentElement;
    var canvasChildren = Array.from(canvas.childNodes).filter(item => item != draggingElement);
    canvasChildren.unshift(draggingElement);
    canvas.childNodes = canvasChildren;

    var transform = draggingElement.getAttributeNS(null, 'transform');
    var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);
    if (match == null) {
        draggingElement = null;
        return;
    }
    draggingElement.draggingInfo = {
        originX: touchpos.clientX,
        originY: touchpos.clientY,
        offsetX: match[1] - touchpos.clientX * (1 / zoomFactor),
        offsetY: match[2] - touchpos.clientY * (1 / zoomFactor),
        scaleX: match[3],
        scaleY: match[4],
        uuid: draggingElement.getAttributeNS(null, 'uuid'),
    };
}

function dragging(evt) {
    var touchpos = getEvtPos(evt);
    if (draggingElement) {
        evt.preventDefault();
        draggingElement.setAttributeNS(null, 'transform', `translate(${(touchpos.clientX * (1 / zoomFactor) + draggingElement.draggingInfo.offsetX)}, ${touchpos.clientY * (1 / zoomFactor) + draggingElement.draggingInfo.offsetY}) scale(${draggingElement.draggingInfo.scaleX} ${draggingElement.draggingInfo.scaleY})`);
    } else if (selectionStartPos != null)
        updateSelection({
            minX: Math.min(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            minY: Math.min(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y,
            maxX: Math.max(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            maxY: Math.max(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y
        })
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
        var droppos = getEvtPos(evt);
        if (Math.abs(draggedElement.draggingInfo.originX - droppos.clientX) > 20
            || Math.abs(draggedElement.draggingInfo.originY - droppos.clientY) > 20)
            draw();
    } else if (selectionStartPos != null) {
        selectionStartPos = null;
        clearSelectionRect();
    }
}

function clearSelectionRect() {
    selectionRect.setAttributeNS(null, 'opacity', 0);
    selectionRect.setAttributeNS(null, 'width', 0);
    selectionRect.setAttributeNS(null, 'height', 0);
}

function clearSelection() {
    clearSelectionRect();
    var selectables = outputSvg.getElementsByClassName('selectable');
    for (let idx in selectables)
        if (selectables[idx].classList != null)
            selectables[idx].classList.remove('selected');
}

function updateSelection(markedArea) {
    selectionRect.setAttributeNS(null, 'x', markedArea.minX);
    selectionRect.setAttributeNS(null, 'y', markedArea.minY);
    selectionRect.setAttributeNS(null, 'width', markedArea.maxX - markedArea.minX);
    selectionRect.setAttributeNS(null, 'height', markedArea.maxY - markedArea.minY);
    selectionRect.setAttributeNS(null, 'opacity', 1);

    var selectables = outputSvg.getElementsByClassName('selectable');
    for (let i = 0; i < selectables.length; i++) {
        var transform = selectables[i].getAttributeNS(null, 'transform');
        var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);

        if (parseInt(match[1]) + 0.2 * signWidth >= markedArea.minX * (1 / zoomFactor)
            && parseInt(match[2]) + 0.2 * signWidth >= markedArea.minY * (1 / zoomFactor)
            && parseInt(match[1]) + 0.8 * signWidth <= markedArea.maxX * (1 / zoomFactor)
            && parseInt(match[2]) + 0.8 * signHeight <= markedArea.maxY * (1 / zoomFactor))
            selectables[i].classList.add('selected');
        else if (selectables[i].classList.contains('selected'))
            selectables[i].classList.remove('selected');
    }
}