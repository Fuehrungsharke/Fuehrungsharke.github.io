function addBBoxFuncToSVGGraphicsElement() {
  const _getBBox = SVGGraphicsElement.prototype.getBBox;
  SVGGraphicsElement.prototype.getBBox = function () {
    let bbox, tempDiv, tempSvg;
    if (document.contains(this))
      return _getBBox.apply(this);

    tempDiv = document.createElement("div");
    tempDiv.setAttribute("style", "position:absolute; visibility:hidden; width:0; height:0");
    if (this.tagName === "svg")
      tempSvg = this.cloneNode(true);
    else {
      tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      tempSvg.appendChild(this.cloneNode(true));
    }
    tempDiv.appendChild(tempSvg);
    document.body.appendChild(tempDiv);
    bbox = _getBBox.apply(tempSvg);
    document.body.removeChild(tempDiv);
    return bbox;
  };

  SVGElement.prototype.getBBox = function () {
    return {
      'width': 256,
      'height': 256,
    };
  };
}

module.exports = { addBBoxFuncToSVGGraphicsElement };