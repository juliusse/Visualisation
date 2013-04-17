/*
Circle class

Florian Wokurka (2013)
Feel free to use.

*/


window.Circle = Circle; 
"use strict";


function Circle(_radius){

	this.radius = _radius;
	this.mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.mySvg.setAttribute("version", "1.2");
	this.mySvg.setAttribute("baseProfile", "tiny");

}


Circle.prototype.appendTo = function(_container) {

	var container = _container;

	this.xPos = container.width() / 2 ; 
	this.yPos = container.height() / 2 ; 

	container.append(this.mySvg);
	this.circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	this.circleElement.setAttribute("cx", this.xPos);
	this.circleElement.setAttribute("cy", this.yPos);
	this.circleElement.setAttribute("r", this.radius);
	this.circleElement.setAttribute("fill", "#336699");

	this.mySvg.appendChild(this.circleElement);
}

Circle.prototype.setRadius = function(_newRadius){
	this.radius = _newRadius;
	this.circleElement.setAttribute("r",this.radius);
}

Circle.prototype.getRadius = function(_newRadius){
	return this.radius;
}



