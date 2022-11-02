var canvasWidth = 512;
var canvasHeight = 256;

var slider = document.getElementById("zoomslider");
var zoomFactor = slider.value / 100;

slider.oninput = function () {
    zoomFactor = this.value / 100;
    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)
    displaySvg.setAttribute('width', canvasWidth * zoomFactor);
    displaySvg.setAttribute('height', canvasHeight * zoomFactor + LINESIZE);
}