let resCache = {};

async function getResourceAsync(path) {
    return new Promise(function (resolve, reject) {
        if (path in resCache)
            return resolve(resCache[path]);
        let req = new XMLHttpRequest();
        req.onload = () => {
            resCache[path] = req.responseText;
            resolve(resCache[path]);
        };
        req.onerror = () => reject(req.response);
        req.open('GET', path);
        req.send();
    });
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