$(function() {




	// setup for task 1

	var startSize = 30;
	var circle1 = new window.Circle(startSize);
	circle1.appendTo($('#circle-1'));

	var circle2 = new window.Circle(startSize);
	circle2.appendTo($('#circle-2'));


	var slider = $('#slider-1').slider({ value: startSize, min:startSize, max: 130});
	slider.on( "slide", function( event, ui ) {
			circle2.setRadius(ui.value);
		} 
	);


	var paginator = new window.Paginator(1,1,2);


	var showResults = function(){
		alert("wert: "+circle2.getRadius()/30);
	}

	$("#showResults").on("click", function(){showResults();}.bind(circle2));



});