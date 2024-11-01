import { LINESIZE } from '../ui_const.mjs';

let slider = document.getElementById("zoomslider");
export let zoomFactor = slider.value / 100;

slider.oninput = function () {
    zoomFactor = this.value / 100;
    zoomcontainer.setAttribute('transform', `scale(${zoomFactor} ${zoomFactor})`)
    let outputWidth = outputSvg.getAttribute('width');
    let outputHeight = outputSvg.getAttribute('height');
    displaySvg.setAttribute('width', outputWidth * zoomFactor);
    displaySvg.setAttribute('height', outputHeight * zoomFactor + LINESIZE);
}