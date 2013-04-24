/*
 Circle class
 
 Florian Wokurka (2013)
 modified by Julius Seltenheim (2013)
 
 Feel free to use.
 
 */


window.Triangle = Triangle;
"use strict";


function Triangle(_size, _color) {

    this.size = _size;
    this.color = _color;
    this.mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.mySvg.setAttribute("version", "1.2");
    this.mySvg.setAttribute("baseProfile", "tiny");
    this.mySvg.setAttribute("class", "testObject");

}


Triangle.prototype.appendTo = function(_container) {

    var container = _container;
    var xMax = container.width() - this.size;
    var yMax = container.height() - this.size;

    var xPos = Math.floor(Math.random() * xMax);
    var yPos = Math.floor(Math.random() * yMax);

    var size = this.size;
    var half = size / 2;

    var startX = xPos;
    var startY = yPos + size;

    container.append(this.mySvg);
    this.triangleElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.triangleElement.setAttribute("d", "M "+startX+" " + startY + " l " + size + " 0 l -" + half + " -" + size + " l -" + half + " " + size);
    this.triangleElement.setAttribute("stroke", "black");
    this.triangleElement.setAttribute("stroke-width", "1");
    this.triangleElement.setAttribute("fill", this.color);

    this.mySvg.appendChild(this.triangleElement);
};



