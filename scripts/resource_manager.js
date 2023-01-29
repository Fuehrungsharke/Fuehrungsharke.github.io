let resCache = {};

async function getResourceAsync(path) {
    if (path in resCache)
        return resCache[path];
    resCache[path] = new Promise((resolve, reject) => {
        console.log(path);
        let req = new XMLHttpRequest();
        req.onload = () => resolve(req.responseText);
        req.onerror = () => reject(req.response);
        req.open('GET', path);
        req.send();
    });
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