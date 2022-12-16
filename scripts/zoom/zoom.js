let canvasWidth = 512;
let canvasHeight = 256;

let slider = document.getElementById("zoomslider");
let zoomFactor = slider.value / 100;

slider.oninput = function () {
    zoomFactor = this.value / 100;
    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)
    displaySvg.setAttribute('width', canvasWidth * zoomFactor);
    displaySvg.setAttribute('height', canvasHeight * zoomFactor + LINESIZE);
}