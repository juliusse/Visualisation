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

var colorsConfig = {
    labels: colorLables,
    distractorColors: ["blue", "yellow", "green", "violet"],
    distractorShapes: ["circle"],
    targetObject: new Circle(20, DrawUtils.colors.red)
};

var shapesConfig = {
    labels: shapeLables,
    distractorColors: ["yellow"],
    distractorShapes: ["circle", "triangle", "star"],
    targetObject: new Square(20, DrawUtils.colors.yellow)
};

var conjunctionConfig = {
    labels: conjunctionLables,
    distractorColors: ["red", "blue", "yellow", "green", "violet"],
    distractorShapes: ["circle", "square", "triangle", "star"],
    targetObject: new Square(20, DrawUtils.colors.red)
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

function getConfForType(_type) {
    var type = _type.toLowerCase();
    if (type === "colors") {
        return colorsConfig;
    } else if (type === "shapes") {
        return shapesConfig;
    } else if (type === "conjunction") {
        return conjunctionConfig;
    }
    return null;
}

function initialiseTest(type, modeClass, choiceDivs, overlayDiv, timerSpan, onFinishCallback) {
    var testname = type + "-" + modeClass;
    var conf = getConfForType(type);

    var mode = new modeClass(testname, levels, conf.labels, conf.distractorColors, conf.distractorShapes, conf.targetObject, overlayDiv, timerSpan, choiceDivs);
    mode.start(onFinishCallback);
}

function initOverviewPage() {
    //fill images
    $(".preview").each(function(index, item) {
        var conf;
        var classList = $(item).attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            if (item.indexOf("test") > -1) {
                var testType = item.split("-")[1];
                conf = getConfForType(testType);
            }
        });

        DrawUtils.drawDistractors(conf.distractorColors, conf.distractorShapes, conf.targetObject, 20, 2, item);
        DrawUtils.drawTarget(conf.targetObject, item);
    });


    //display if finished / passed and print results
    $(".passed").each(function(index) {
        var type = $(this).attr("id").split("-")[1];
        var mode = $(this).attr("id").split("-")[2];

        var results = {};
        var resultKeys = {};
        if (localStorage[type + "-" + mode]) {
            results = JSON.parse(localStorage[type + "-" + mode]);
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


                if (results[i] !== undefined) {
                    var td = $("#" + type + "-" + mode + "-" + i);
                    if (typeof(results[i]) === "number") {
                        var time = parseInt(results[i]);
                        td.text(time + " ms");
                        //set color
                        if (time <= 700) {
                            td.toggleClass("text-success");
                        } else if (time < 1000) {
                            td.toggleClass("text-warning");
                        } else {
                            td.toggleClass("text-error");
                        }
                    } else {
                        td.toggleClass("iconFont");
                        if (results[i]) {
                            td[0].innerHTML = '&#229;';
                            td.toggleClass("text-success");
                        } else {
                            td[0].innerHTML = '&#227;';
                            td.toggleClass("text-error");
                        }
                    }
                }
            }
        }


    });



}




