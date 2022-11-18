// https://stackoverflow.com/a/44769098

function triggerDownload(imgURI, fileName) {
    var evt = new MouseEvent("click", {
        view: window,
        bubbles: false,
        cancelable: true
    });
    var a = document.createElement("a");
    a.setAttribute("download", fileName);
    a.setAttribute("href", imgURI);
    a.setAttribute("target", '_blank');
    a.dispatchEvent(evt);
}

function downloadPng(svg, fileName) {
    var copy = svg.cloneNode(true);
    var canvas = document.createElement("canvas");
    var bbox = svg.getBBox();
    canvas.width = bbox.width;
    canvas.height = bbox.height;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, bbox.width, bbox.height);
    var data = new XMLSerializer().serializeToString(copy);
    var DOMURL = window.URL || window.webkitURL || window;
    var img = new Image();
    var svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var url = DOMURL.createObjectURL(svgBlob);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
        if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
            var blob = canvas.msToBlob();
            navigator.msSaveOrOpenBlob(blob, fileName);
        }
        else {
            var imgURI = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            triggerDownload(imgURI, fileName);
        }
        canvas.remove();
    };
    img.src = url;
}