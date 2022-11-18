var selectionRect = document.getElementById("selectionRect");
var selectionStartPos = null;
var dragButton = null;
var draggingElements = null;
var hoveringUuid = null;

function pointerOverSvg(uuid) {
    hoveringUuid = uuid;
}

function pointerOutSvg(uuid) {
    if (hoveringUuid == uuid)
        hoveringUuid = null;
}

function drag(evt) {
    if (evt.pointerType == 'mouse') {
        if (evt.button != 0 && evt.button != 2)
            return;
        dragButton = evt.button;
    }

    var element = evt.target;
    if (element.nodeName == 'text' && element.getAttributeNS(null, 'uuid') != null)
        return;

    while (element != null && !element.classList.contains('draggable') && element.id != 'outputSvg')
        element = element.parentElement;

    var touchpos = getEvtPos(evt);
    if (element == null || !element.classList.contains('draggable')) {
        selectionStartPos = touchpos;
        return;
    }

    var mode = getEventMode(evt);
    if (!element.classList.contains('selected') || mode == 'remove') {
        var transform = getTransform(element);
        var elementDimensions = getElementDimensions(element);
        updateSelection({
            'minX': fromCanvasCoords(transform.x),
            'minY': fromCanvasCoords(transform.y),
            'maxX': fromCanvasCoords(transform.x + elementDimensions[0]),
            'maxY': fromCanvasCoords(transform.y + elementDimensions[1]),
        }, mode);
        clearSelectionRect();
    }

    draggingElements = outputSvg.getElementsByClassName('selected');
    for (let i = 0; i < draggingElements.length; i++)
        draggingElements[i].classList.add('draggedElement');

    var canvasChildren = Array.from(outputSvg.childNodes).filter(item => !(item in draggingElements));
    canvasChildren.unshift(draggingElements);
    outputSvg.childNodes = canvasChildren;

    for (let i = 0; i < draggingElements.length; i++) {
        var transform = draggingElements[i].getAttributeNS(null, 'transform');
        var match = /translate\((\d+), (\d+)\) scale\((\d+) (\d+)\)/gi.exec(transform);
        draggingElements[i].draggingInfo = {
            originX: touchpos.clientX,
            originY: touchpos.clientY,
            offsetX: match[1] - touchpos.clientX * (1 / zoomFactor),
            offsetY: match[2] - touchpos.clientY * (1 / zoomFactor),
            scaleX: match[3],
            scaleY: match[4],
            uuid: draggingElements[i].getAttributeNS(null, 'uuid'),
        };
    }
}

function dragging(evt) {
    if (evt.pointerType == 'mouse' && dragButton != 0)
        return;
    var touchpos = getEvtPos(evt);
    if (draggingElements != null) {
        evt.preventDefault();
        for (let i = 0; i < draggingElements.length; i++)
            draggingElements[i].setAttributeNS(null, 'transform', `translate(${(touchpos.clientX * (1 / zoomFactor) + draggingElements[i].draggingInfo.offsetX)}, ${touchpos.clientY * (1 / zoomFactor) + draggingElements[i].draggingInfo.offsetY}) scale(${draggingElements[i].draggingInfo.scaleX} ${draggingElements[i].draggingInfo.scaleY})`);
    } else if (selectionStartPos != null) {
        var mode = getEventMode(evt);
        updateSelection({
            minX: Math.min(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            minY: Math.min(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y,
            maxX: Math.max(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            maxY: Math.max(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y
        }, mode);
    }
}

function drop(evt) {
    var draggedElements = draggingElements;
    draggingElements = null;
    dragButton = null;
    if (hoveringUuid != null && draggedElements != null) {
        var target = getByUuid(config, hoveringUuid);
        var selectedElements = getSelectedElements();
        if (selectedElements != null && !selectedElements.some(selectedElement => selectedElement.uuid == target.uuid)) {
            var targetParent = getParentByUuid(config, hoveringUuid);
            for (let i = 0; i < draggedElements.length; i++) {
                var source = getParentByUuid(config, draggedElements[i].draggingInfo.uuid);
                var subject = getByUuid(config, draggedElements[i].draggingInfo.uuid);

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
        }
    }
    var droppos = getEvtPos(evt);
    if (draggedElements != null) {
        for (let i = 0; i < draggedElements.length; i++) {
            draggedElements[i].classList.remove('draggedElement');
        }
        if (Math.abs(draggedElements[0].draggingInfo.originX - droppos.clientX) > 20
            || Math.abs(draggedElements[0].draggingInfo.originY - droppos.clientY) > 20)
            draw();
    } else if (selectionStartPos != null) {
        if (evt.button == 0
            && selectionStartPos.clientX == droppos.clientX
            && selectionStartPos.clientY == droppos.clientY) {
            clearSelection();
        }
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

function clearDragged() {
    var dragged = outputSvg.getElementsByClassName('draggedElement');
    for (let i = 0; i < dragged.length; i++)
        dragged[i].classList.remove('draggedElement');
    draggingElements = null;
    dragButton = null;
}

function updateSelection(markedArea, mode) {
    selectionRect.setAttributeNS(null, 'x', markedArea.minX);
    selectionRect.setAttributeNS(null, 'y', markedArea.minY);
    selectionRect.setAttributeNS(null, 'width', markedArea.maxX - markedArea.minX);
    selectionRect.setAttributeNS(null, 'height', markedArea.maxY - markedArea.minY);
    selectionRect.setAttributeNS(null, 'opacity', 1);

    var selectables = outputSvg.getElementsByClassName('selectable');
    for (let i = 0; i < selectables.length; i++) {
        var transform = getTransform(selectables[i]);
        var elementDimensions = getElementDimensions(selectables[i]);
        if (parseInt(transform.x) + 0.2 * elementDimensions[0] >= toCanvasCoords(markedArea.minX)
            && parseInt(transform.y) + 0.2 * elementDimensions[1] >= toCanvasCoords(markedArea.minY)
            && parseInt(transform.x) + 0.8 * elementDimensions[0] <= toCanvasCoords(markedArea.maxX)
            && parseInt(transform.y) + 0.8 * elementDimensions[1] <= toCanvasCoords(markedArea.maxY)) {
            if (mode == 'remove')
                selectables[i].classList.remove('selected');
            else
                selectables[i].classList.add('selected');
        }
        else if (mode == 'normal' && selectables[i].classList.contains('selected'))
            selectables[i].classList.remove('selected');
    }
}

function getEventMode(evt) {
    var mode = 'normal';
    if (evt.ctrlKey)
        mode = 'add';
    else if (evt.shiftKey)
        mode = 'remove';
    return mode;
}