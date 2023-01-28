// https://stackoverflow.com/a/44769098

function triggerDownload(imgURI, fileName) {
    let evt = new MouseEvent("click", {
        view: window,
        bubbles: false,
        cancelable: true
    });
    let a = document.createElement("a");
    a.setAttribute("download", fileName);
    a.setAttribute("href", imgURI);
    a.setAttribute("target", '_blank');
    a.dispatchEvent(evt);
}

function downloadPng(svg, fileName) {
    let copy = svg.cloneNode(true);
    let canvas = document.createElement("canvas");
    let bbox = svg.getBBox();
    canvas.width = bbox.width;
    canvas.height = bbox.height;
    document.body.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, bbox.width, bbox.height);
    let data = new XMLSerializer().serializeToString(copy);
    let DOMURL = window.URL || window.webkitURL || window;
    let img = new Image();
    let svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    let url = DOMURL.createObjectURL(svgBlob);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            let blob = canvas.msToBlob();
            navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            let imgURI = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            triggerDownload(imgURI, fileName);
        }
        canvas.remove();
    };
    img.src = url;
}