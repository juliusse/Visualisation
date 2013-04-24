/*
 TimeTrialMode class
 
 Julius Seltenheim (2013)
 
 Feel free to use.
 
 */

window.TimeTrialMode = TimeTrialMode;


function TimeTrialMode(_name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs) {
    var instrText = "Find the target! Use the arrow keys for selection."
    ModeBase.call(this, _name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs, instrText);
    
}

TimeTrialMode.prototype = Object.create(ModeBase.prototype);


TimeTrialMode.prototype.startRound = function() {
    var roundConfig = this.levels[this.currentRound];
    this.setDistractors(roundConfig.distractors, roundConfig.distractorTypes);
    //define where target goes
    var choiceArea = Math.floor((Math.random() * 4) + 1);
    this.targetDirection = choiceArea + "";
    var area = $("#" + ModeBase.directions[choiceArea]);
    this.setTarget(area);

    this.roundRunning = true;
    this.roundStartTime = Date.now();
};

TimeTrialMode.prototype.endRound = function() {

    var duration = Date.now() - this.roundStartTime;
    this.roundRunning = false;
    this.results[this.currentRound] = duration;
    this.overlaySpan.text(duration + " ms");
    this.overlayDiv.show();

    this.currentRound += 1;

    if (this.currentRound <= this.levelCount) {
        var mode = this;
        setTimeout(function() {
            mode.choiceDivs.empty();
            mode.showLable(mode.labels[("round" + mode.currentRound)], 3000, mode.countdown(mode));
        }, 2000);
    } else {
        var mode = this;
        //test finished
        setTimeout(function() {
            mode.overlaySpan.text("Test finished.");
            mode.onFinishCallback(mode.results);
        }, 2000);
    }
};



TimeTrialMode.prototype.keyPressed = function(direction) {
    if (this.roundRunning) {
        if (direction === this.targetDirection) {
            this.endRound();
        }
    }
};