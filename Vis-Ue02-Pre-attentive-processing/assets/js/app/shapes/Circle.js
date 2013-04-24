/*
 Circle class
 
 Florian Wokurka (2013)
 modified by Julius Seltenheim (2013)
 
 Feel free to use.
 
 */


window.Circle = Circle;
"use strict";


function Circle(_diameter, _color) {

    this.radius = _diameter / 2;
    this.color = _color;
    this.mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.mySvg.setAttribute("version", "1.2");
    this.mySvg.setAttribute("baseProfile", "tiny");
    this.mySvg.setAttribute("class", "testObject");

}


Circle.prototype.appendTo = function(_container) {

    var container = _container;
    var xMax = container.width() - 3 * this.radius;
    var yMax = container.height() - 3 * this.radius;

    var xPos = Math.floor(Math.random() * xMax) + this.radius;
    var yPos = Math.floor(Math.random() * yMax) + this.radius;


    this.xPos = xPos;
    this.yPos = yPos;
    $(this.mySvg).empty();
    container.append(this.mySvg);

    this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.circleElement.setAttribute("cx", this.xPos);
    this.circleElement.setAttribute("cy", this.yPos);
    this.circleElement.setAttribute("r", this.radius);
    this.circleElement.setAttribute("stroke", "black");
    this.circleElement.setAttribute("stroke-width", "1");
    this.circleElement.setAttribute("fill", this.color);

    this.mySvg.appendChild(this.circleElement);
};

Circle.prototype.setRadius = function(_newRadius) {
    this.radius = _newRadius;
    this.circleElement.setAttribute("r", this.radius);
};

Circle.prototype.getRadius = function() {
    return this.radius;
};

Circle.prototype.toString = function() {
    return "circle";
};

Circle.prototype.getSize = function() {
    return this.radius * 2;
};

Circle.prototype.getColor = function() {
    return this.color;
};

