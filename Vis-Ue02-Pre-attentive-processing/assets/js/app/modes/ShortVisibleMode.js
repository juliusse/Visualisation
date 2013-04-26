/*
 ShortVisibleMode class
 
 Julius Seltenheim (2013)
 
 Feel free to use.
 
 */

window.ShortVisibleMode = ShortVisibleMode;


function ShortVisibleMode(_name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs) {
    var instrText = "You will see the images only for 500ms. Can you find the target?";
    ModeBase.call(this, _name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs, instrText);

}

ShortVisibleMode.prototype = Object.create(ModeBase.prototype);


ShortVisibleMode.prototype.startRound = function() {
    var roundConfig = this.levels[this.currentRound];
    this.setDistractors(roundConfig.distractors, roundConfig.distractorTypes);
    //define where target goes
    var choiceArea = Math.floor((Math.random() * 4) + 1);
    this.targetDirection = choiceArea + "";
    var area = $("#" + ModeBase.directions[choiceArea]);
    this.setTarget(area);

    this.roundRunning = true;
    var mode = this;
    setTimeout(function() {
        mode.choiceDivs.empty();
    }, 500);
};

ShortVisibleMode.prototype.endRound = function(success) {
    this.roundRunning = false;
    this.results[this.currentRound] = success;
    this.overlaySpan.text(success ? "correct!" : "wrong!");
    this.overlayDiv.show();

    this.currentRound += 1;


    if (!success) {
        var mode = this;
        setTimeout(function() {
            mode.overlaySpan.text("Try again!");
            mode.onFinishCallback(mode.results);
        }, 2000);
    } else if (this.currentRound <= this.levelCount) {
        var mode = this;
        setTimeout(function() {
            mode.showLable(mode.labels[("round" + mode.currentRound)], 4000, mode.countdown(mode));
        }, 2000);
    } else {
        var mode = this;
        //test finished
        setTimeout(function() {
            mode.overlaySpan.text("Good Job!");
            mode.onFinishCallback(mode.results);
        }, 2000);
    }
};



ShortVisibleMode.prototype.keyPressed = function(direction) {
    if (this.roundRunning) {
        this.endRound(direction === this.targetDirection);
    }
};