let resCache = {};
function getResource(path) {
    if (path in resCache)
        return resCache[path];
    let req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();
    resCache[path] = req.responseText;
    return resCache[path];
}

function download(content, type, filename) {
    let dataStr = `data:${type};charset=utf-8,` + encodeURIComponent(content);
    let downloadJsonAnchorNode = document.createElement('a');
    downloadJsonAnchorNode.setAttribute("href", dataStr);
    downloadJsonAnchorNode.setAttribute("download", filename);
    document.body.appendChild(downloadJsonAnchorNode);
    downloadJsonAnchorNode.click();
    downloadJsonAnchorNode.remove();
}