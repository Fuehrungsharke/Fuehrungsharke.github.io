let canvasDim = {
    width: 512,
    height: 256
};

let slider = document.getElementById("zoomslider");
let zoomFactor = slider.value / 100;

slider.oninput = function () {
    zoomFactor = this.value / 100;
    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)
    displaySvg.setAttribute('width', canvasDim.width * zoomFactor);
    displaySvg.setAttribute('height', canvasDim.height * zoomFactor + LINESIZE);
}

module.exports = { zoomFactor };