/*
Abstact Task class

Florian Wokurka (2013)
Feel free to use.

*/


window.Paginator = Paginator; 
"use strict";


function Paginator(_current, _min, _max){

	this.currentlyActive = _current;
	this.min = _min;
	this.max = _max;

	$("#pagination").on("click", function(evt){this.switchTask(evt);}.bind(this));
}




Paginator.prototype.switchTask = function(evt) {

	var clickedOn = $(evt.target).text();

	if(clickedOn == "Next"){
		clickedOn = this.getNextPagenumber();
	}
	
	if(clickedOn == "Prev"){
		clickedOn = this.getPrevPagenumber()
	}

	clickedOn = parseFloat(clickedOn);

	if((typeof clickedOn == "number") && (this.currentlyActive != clickedOn)){

		console.log("switch to #task-"+clickedOn);

		$("#task-"+this.currentlyActive).fadeOut(400, function(){$("#task-"+clickedOn).fadeIn(400);});

		$("#paginator-page-"+this.currentlyActive).toggleClass("disabled");
		$("#paginator-page-"+clickedOn).toggleClass("disabled");

		this.currentlyActive = clickedOn;
	}

}

Paginator.prototype.getNextPagenumber = function() {
	var wouldBe = this.currentlyActive +1;
	return (wouldBe >= this.max) ? this.max : wouldBe;
}

Paginator.prototype.getPrevPagenumber = function() {
	var wouldBe = this.currentlyActive -1;
	return (wouldBe <= this.min) ? this.min : wouldBe; 
}

Circle.prototype.setContent = function(_newRadius){

	this.radius = _newRadius;
	this.circleElement.setAttribute("r",this.radius);

}