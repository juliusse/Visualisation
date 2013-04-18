$(function() {




	// setup for task 1

	var startSize = 30;
	var circle1 = new window.Circle(startSize);
	circle1.appendTo($('#circle-1'));

	var circle2 = new window.Circle(startSize);
	circle2.appendTo($('#circle-2'));


	var slider1 = $('#slider-1').slider({ value: startSize, min:startSize, max: 130});
	slider1.on( "slide", function( event, ui ) {
			circle2.setRadius(ui.value);
		} 
	);


	var paginator = new window.Paginator(1,1,2);


	var setresultValues = function(){

		/*
			3 = 2.5 pow x
			ln(3) = x * ln(2.5)
			x = ln(3)/ln(2.5)
		*/

		var radius1 = circle2.getRadius();
		var radius2 = parseFloat($('#answere').html());

		var factor1 = Math.log(90)/Math.log(radius1) 
		var factor2 = Math.log(2.25)/Math.log(radius2)

		$('#result-1').html('The Factor for the first Answere is:  '+factor1.toFixed(3));
		$('#result-2').html('The Factor for the second Answere is: '+factor2.toFixed(3));
	}



	// setup for task 2
	var circle3 = new window.Circle(90);
	circle3.appendTo($('#circle-3'));

	var circle4 = new window.Circle(40);
	circle4.appendTo($('#circle-4'));

	var slider2 = $('#slider-2').slider({ value: 1.0, min:1.0, max: 5.0, step: 0.1});
	slider2.on( "slide", function( event, ui ) {
			$('#answere').html(ui.value.toFixed(1));
		} 
	);	

	$('#task-2').hide();


	$("#showResults").on("click", function(){setresultValues();}.bind(circle2, slider2));


});