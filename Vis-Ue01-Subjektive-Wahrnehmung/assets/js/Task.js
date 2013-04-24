/*
Abstact Task class

Florian Wokurka (2013)
Feel free to use.

*/


window.Task = Task; 
"use strict";


function Task(text, content){

	this.resultingValue = -1;

}




Circle.prototype.getValue = function(_container) {
	return this.resultingValue;
}



Circle.prototype.setContent = function(_newRadius){

	this.radius = _newRadius;
	this.circleElement.setAttribute("r",this.radius);

}



