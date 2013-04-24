/**
 * 
 * Main application logic.
 * It is not very pretty (yet), but does it's job :)
 * 
 * Julius Seltenheim (2013)
 * 
 * Feel free to use.
 */

"use strict";

var directions = {
    1: "left",
    2: "up",
    3: "right",
    4: "down",
    left: "1",
    up: "2",
    right: "3",
    down: "4"
};


var colors = {
    red: "#b94a48",
    blue: "#336699",
    yellow: "#c09853",
    green: "#468847",
    violett: "#913b8e"
};

var shapes = {
    circle: Circle,
    square: Square,
    triangle: Triangle
};

var colorLables = {
    round1: "Where is the red circle?",
    round2: "Now with more distractors...",
    round3: "Added even more disctractors...",
    round4: "Let's try different distractors!",
    round5: "How about 3 distractor types?",
    round6: "4 Distractor types!!",
    round7: "Final Test",
};

var shapeLables = {
    round1: "Where is the square?",
    round2: "Now with more distractors...",
    round3: "Added even more disctractors...",
    round4: "Let's try different distractors!",
    round5: "How about 3 distractor types?",
    round6: "4 Distractor types!!",
    round7: "Final Test",
};

var conjunctionLables = {
    round1: "Where is the red square?",
    round2: "Now with more distractors...",
    round3: "Added even more disctractors...",
    round4: "Let's try different distractors!",
    round5: "How about 3 distractor types?",
    round6: "4 Distractor types!!",
    round7: "Final Test",
};

var levelCount = 7;
var levels = {
    1: {
        distractors: 10,
        distractorTypes: 1
    },
    2: {
        distractors: 25,
        distractorTypes: 1
    },
    3: {
        distractors: 50,
        distractorTypes: 1
    },
    4: {
        distractors: 25,
        distractorTypes: 2
    },
    5: {
        distractors: 25,
        distractorTypes: 3
    },
    6: {
        distractors: 25,
        distractorTypes: 4
    },
    7: {
        distractors: 50,
        distractorTypes: 4
    }
};

var testname;
var testType;
var labels;
var choiceDivs;
var overlay;
var overlaySpan;
var timerSpan;
var currentRound;
var roundRunning = false;
var roundStartTime;
var targetDirection;
var countdownInterval;
var results = {};


function countdown() {
    if (timerSpan.text() === "") {
        //starting timer
        timerSpan.text("3");
        countdownInterval = window.setInterval(countdown, 1000);
    } else if (timerSpan.text() === "Go!") {
        window.clearInterval(countdownInterval);
        timerSpan.text("");
        startRound();
    } else {
        var timeLeft = parseInt(timerSpan.text()) - 1;
        if (timeLeft > 0)
            timerSpan.text(timeLeft);
        if (timeLeft === 0) {
            timerSpan.text("Go!");
        }
    }

}



function setTarget(testType, area) {
    var shape = null;
    if (testType === "colors") {
        //set red circle
        shape = new Circle(20, colors.red);
    } else if (testType === "shapes") {
        //set yellow square
        shape = new Square(20, colors.yellow);
    } else if (testType === "conjunction") {
        //set red square
        shape = new Square(20, colors.red);
    }
    if (shape !== null)
        shape.appendTo(area);
}

function setDistractors(testType, count, variance, areas) {
    //generate color keys
    var colorKeys = Object.keys(colors);
    if (testType !== "conjunction") {
        //remove red
        colorKeys.splice(colorKeys.indexOf("red"), 1);
    }
    while (variance < colorKeys.length) {
        colorKeys.splice(colorKeys.length - 1, 1);
    }


    //generate shape keys
    var shapeKeys = Object.keys(shapes);
    if (testType !== "conjunction") {
        //remove square
        shapeKeys.splice(shapeKeys.indexOf("square"), 1);
    }
    while (variance < shapeKeys.length) {
        shapeKeys.splice(shapeKeys.length - 1, 1);
    }


    $(areas).each(function(index) {
        for (var i = 0; i < count; i++) {
            var shapeType = null;
            var color = null;

            if (testType === "colors") {
                color = variance === 1 ? colors.blue : colors[colorKeys[Math.floor((Math.random() * colorKeys.length))]];
                shapeType = shapes.circle;
            } else if (testType === "shapes") {
                shapeType = variance === 1 ? shapes.circle : shapes[shapeKeys[Math.floor((Math.random() * shapeKeys.length))]];
                color = colors.yellow;
            } else if (testType === "conjunction") {
                shapeType = variance === 1 ? shapes.circle : shapes[shapeKeys[Math.floor((Math.random() * shapeKeys.length))]];
                color = colors.red;
                while (shapeType === shapes.square && color === colors.red)
                    color = variance === 1 ? colors.blue : colors[colorKeys[Math.floor((Math.random() * colorKeys.length))]];
            }

            var shape = new shapeType(20, color);
            shape.appendTo($(this));
        }
    });



    if (testType === "colors") {


    } else if (testType === "shapes") {


        $(areas).each(function(index) {
            for (var i = 0; i < count; i++) {

            }
        });

        $(areas).each(function(index) {
            for (var i = 0; i < count; i++) {
                var shape = variance === 1 ? shapes.circle : shapes[shapeKeys[Math.floor((Math.random() * shapeKeys.length))]];
                var circle = new shape(20, colors.yellow);
                var color = variance === 1 ? colors.blue : colors[colorKeys[Math.floor((Math.random() * colorKeys.length))]];
                circle.appendTo($(this));
            }
        });
    }


}



function startRound() {
    var roundConfig = levels[currentRound];
    setDistractors(testType, roundConfig.distractors, roundConfig.distractorTypes, choiceDivs);
    //define where target goes
    var choiceArea = Math.floor((Math.random() * 4) + 1);
    targetDirection = choiceArea + "";
    var area = $("#" + directions[choiceArea]);
    setTarget(testType, area);
    roundRunning = true;
    roundStartTime = Date.now();

}

function endRound() {

    var duration = Date.now() - roundStartTime;
    roundRunning = false;
    results[currentRound] = duration;
    overlaySpan.text(duration + " ms");
    overlay.show();

    currentRound += 1;

    if (currentRound <= levelCount) {
        setTimeout(function() {
            choiceDivs.empty();
            showLable(labels[("round" + currentRound)], 3000, countdown());
        }, 2000);
    } else {
        //test finished
        localStorage[testname] = JSON.stringify(results);
        setTimeout(function() {
            overlaySpan.text("Test finished. Sending you back to the overview.");
            setTimeout(function() {
                window.location.replace("./");
            }, 1500);
        }, 2000);
    }
}

function showLable(text, fadeOutDuration, onFinishCallback) {
    overlaySpan.text(text);
    overlay.fadeOut(fadeOutDuration, onFinishCallback);
}

function keyPressed(direction) {
    if (roundRunning) {
        if (direction === targetDirection) {
            endRound();
        }
    }
}

$(document).keydown(function(e) {
    if (e.keyCode === 37) { //left
        keyPressed(directions.left);
        return false;
    } else if (e.keyCode === 38) { //up
        keyPressed(directions.up);
        return false;
    } else if (e.keyCode === 39) { //right
        keyPressed(directions.right);
        return false;
    } else if (e.keyCode === 40) { //down
        keyPressed(directions.down);
        return false;
    }
});

function initialiseTest() {
    var testLevel = "";

    var classList = $('body').attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        if (item.indexOf("easy") > -1) {
            testType = item.split("-")[0];
            testLevel = item.split("-")[1];
        } else if (item.indexOf("hard") > -1) {
            testType = item.split("-")[0];
            testLevel = item.split("-")[1];
        }
    });

    if (testLevel === "") {
        alert("Cannot initialise Test!");
        return false;
    }

    testname = testType + "-" + testLevel;
    choiceDivs = $(".choice");
    overlay = $("#overlay");
    overlaySpan = overlay.find("span");
    timerSpan = $("#timer");

    // set the labels
    if (testType === "colors")
        labels = colorLables;
    else if (testType === "shapes")
        labels = shapeLables;
    else if (testType === "conjunction")
        labels = conjunctionLables;

    currentRound = 1;

    showLable(labels.round1, 2000, countdown);
}


function initOverviewPage() {
    //fill images
    $(".preview").each(function(index, item) {
        var testType = "";
        var classList = $(item).attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            if (item.indexOf("test") > -1) {
                testType = item.split("-")[1];
            }
        });
        setDistractors(testType, 20, 2, item);
        setTarget(testType, $(item));
    });


    //display if finished / passed and print results
    $(".passed").each(function(index) {
        var type = $(this).attr("id").split("-")[1];
        var difficulty = $(this).attr("id").split("-")[2];

        var results = {};
        var resultKeys = {};
        if (localStorage[type + "-" + difficulty]) {
            results = JSON.parse(localStorage[type + "-" + difficulty]);
            resultKeys = Object.keys(results);

            if (resultKeys.length === levelCount) {
                this.innerHTML = '&#229;';
                $(this).toggleClass("text-success");
            } else {
                this.innerHTML = '&#227;';
                $(this).toggleClass("text-error");
            }

            //print results in table
            for (var i = 1; i <= levelCount; i++) {
                //set table lables
                var levelConf = levels[i];
                $("#" + type + "-" + i + "-distr").text(levelConf.distractors);
                $("#" + type + "-" + i + "-distrTypes").text(levelConf.distractorTypes);

                if (results[i]) {
                    var time = parseInt(results[i]);
                    var td = $("#" + type + "-" + i);
                    td.text(time + " ms");
                    //set color
                    if (time <= 700) {
                        td.toggleClass("text-success");
                    } else if (time < 1000) {
                        td.toggleClass("text-warning");
                    } else {
                        td.toggleClass("text-error");
                    }
                }
            }
        } else {
            $("#"+type+"-timetrial").remove();
        }


    });



}




