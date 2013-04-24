/*
 Square class
 
 Julius Seltenheim (2013)
 based on Circle.js by Florian Wokurka (2013)
 
 Feel free to use.
 
 */


window.Square = Square;
"use strict";


function Square(_sideLength, _color) {

    this.sideLength = _sideLength;
    this.color = _color;
    this.mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.mySvg.setAttribute("version", "1.2");
    this.mySvg.setAttribute("baseProfile", "tiny");
    this.mySvg.setAttribute("class", "testObject");

}


Square.prototype.appendTo = function(_container) {

    var container = _container;
    var xMax = container.width() - 1 * this.sideLength;
    var yMax = container.height() - 1 * this.sideLength;

    var xPos = Math.floor(Math.random() * xMax);
    var yPos = Math.floor(Math.random() * yMax);


    this.xPos = xPos;
    this.yPos = yPos;

    container.append(this.mySvg);
    this.squareElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.squareElement.setAttribute("x", this.xPos);
    this.squareElement.setAttribute("y", this.yPos);
    this.squareElement.setAttribute("width", this.sideLength);
    this.squareElement.setAttribute("height", this.sideLength);
    this.squareElement.setAttribute("stroke", "black");
    this.squareElement.setAttribute("stroke-width", "1");
    this.squareElement.setAttribute("fill", this.color);

    this.mySvg.appendChild(this.squareElement);
};


