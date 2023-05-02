let selectionRect = document.getElementById("selectionRect");
let selectionStartPos = null;
let dragButton = null;
let draggingElements = null;
let hoveringUuid = null;

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

    let element = evt.target;
    if (element.nodeName == 'text' && element.getAttributeNS(null, 'uuid') != null)
        return;

    while (element != null && !element.classList.contains('draggable') && element.id != 'outputSvg')
        element = element.parentElement;

    let touchpos = getEvtPos(evt);
    if (element == null || !element.classList.contains('draggable')) {
        selectionStartPos = touchpos;
        return;
    }

    let mode = getEventMode(evt);
    if (!element.classList.contains('selected') || mode == 'remove') {
        let transform = getTransform(element);
        let elementDimensions = getElementDimensions(element);
        updateSelection({
            'minX': fromCanvasCoords(transform.x),
            'minY': fromCanvasCoords(transform.y),
            'maxX': fromCanvasCoords(transform.x + elementDimensions[0]),
            'maxY': fromCanvasCoords(transform.y + elementDimensions[1]),
        }, mode);
        clearSelectionRect();
    }

    draggingElements = outputSvg.getElementsByClassName('selected');
    for (const draggingElement of draggingElements)
        draggingElement.classList.add('draggedElement');

    let canvasChildren = Array.from(outputSvg.childNodes).filter(item => !(item in draggingElements));
    canvasChildren.unshift(draggingElements);
    outputSvg.childNodes = canvasChildren;

    for (const draggingElement of draggingElements) {
        let transform = getTransform(draggingElement);
        draggingElement.draggingInfo = {
            originX: touchpos.clientX,
            originY: touchpos.clientY,
            offsetX: transform.x - touchpos.clientX * (1 / zoomFactor),
            offsetY: transform.y - touchpos.clientY * (1 / zoomFactor),
            scaleX: transform.scaleX,
            scaleY: transform.scaleY,
            uuid: draggingElement.getAttributeNS(null, 'uuid'),
        };
    }
}

function dragging(evt) {
    if (evt.pointerType == 'mouse' && dragButton != 0)
        return;
    let touchpos = getEvtPos(evt);
    if (draggingElements != null) {
        evt.preventDefault();
        for (const draggingElement of draggingElements)
            draggingElement.setAttributeNS(null, 'transform', `translate(${(touchpos.clientX * (1 / zoomFactor) + draggingElement.draggingInfo.offsetX)}, ${touchpos.clientY * (1 / zoomFactor) + draggingElement.draggingInfo.offsetY}) scale(${draggingElement.draggingInfo.scaleX} ${draggingElement.draggingInfo.scaleY})`);
    } else if (selectionStartPos != null) {
        let mode = getEventMode(evt);
        updateSelection({
            minX: Math.min(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            minY: Math.min(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y,
            maxX: Math.max(selectionStartPos.clientX, touchpos.clientX) - displaySvg.getBoundingClientRect().x,
            maxY: Math.max(selectionStartPos.clientY, touchpos.clientY) - displaySvg.getBoundingClientRect().y
        }, mode);
    }
}

function drop(evt) {
    let draggedElements = draggingElements;
    draggingElements = null;
    dragButton = null;
    if (hoveringUuid != null && draggedElements != null) {
        let target = getByUuid(config, hoveringUuid);
        let selectedElements = getSelectedElements();
        if (selectedElements != null && !selectedElements.some(selectedElement => selectedElement.uuid == target.uuid)) {
            let targetParent = getParentByUuid(config, hoveringUuid);
            for (const draggedElement of draggedElements) {
                let source = getParentByUuid(config, draggedElement.draggingInfo.uuid);
                let subject = getByUuid(config, draggedElement.draggingInfo.uuid);

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
    let droppos = getEvtPos(evt);
    if (draggedElements != null) {
        for (const draggedElement of draggedElements) {
            draggedElement.classList.remove('draggedElement');
        }
        if (Math.abs(draggedElements[0].draggingInfo.originX - droppos.clientX) > 20
            || Math.abs(draggedElements[0].draggingInfo.originY - droppos.clientY) > 20)
            draw();
    } else if (selectionStartPos != null) {
        if (evt.button == 0
            && selectionStartPos.clientX == droppos.clientX
            && selectionStartPos.clientY == droppos.clientY)
            clearSelection();
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
    let selectables = outputSvg.getElementsByClassName('selectable');
    for (let idx in selectables)
        if (selectables[idx].classList != null)
            selectables[idx].classList.remove('selected');
}

function clearDragged() {
    let dragged = outputSvg.getElementsByClassName('draggedElement');
    for (const element of dragged)
        element.classList.remove('draggedElement');
    draggingElements = null;
    dragButton = null;
}

function updateSelection(markedArea, mode) {
    selectionRect.setAttributeNS(null, 'x', markedArea.minX);
    selectionRect.setAttributeNS(null, 'y', markedArea.minY);
    selectionRect.setAttributeNS(null, 'width', markedArea.maxX - markedArea.minX);
    selectionRect.setAttributeNS(null, 'height', markedArea.maxY - markedArea.minY);
    selectionRect.setAttributeNS(null, 'opacity', 1);

    let selectables = outputSvg.getElementsByClassName('selectable');
    for (const selectable of selectables) {
        let transform = getAbsTransform(selectable);
        let elementDimensions = getElementDimensions(selectable);
        if (parseInt(transform.x) + 0.2 * elementDimensions[0] >= toCanvasCoords(markedArea.minX)
            && parseInt(transform.y) + 0.2 * elementDimensions[1] >= toCanvasCoords(markedArea.minY)
            && parseInt(transform.x) + 0.8 * elementDimensions[0] <= toCanvasCoords(markedArea.maxX)
            && parseInt(transform.y) + 0.8 * elementDimensions[1] <= toCanvasCoords(markedArea.maxY)) {
            if (mode == 'remove')
                selectable.classList.remove('selected');
            else
                selectable.classList.add('selected');
        }
        else if (mode == 'normal' && selectable.classList.contains('selected'))
            selectable.classList.remove('selected');
    }
}

function getEventMode(evt) {
    let mode = 'normal';
    if (evt.ctrlKey)
        mode = 'add';
    else if (evt.shiftKey)
        mode = 'remove';
    return mode;
}