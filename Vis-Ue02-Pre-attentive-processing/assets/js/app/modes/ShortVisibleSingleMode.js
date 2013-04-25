/*
 ShortVisibleMode class
 
 Julius Seltenheim (2013)
 
 Feel free to use.
 
 */

window.ShortVisibleSingleMode = ShortVisibleSingleMode;


function ShortVisibleSingleMode(_name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs) {
    var instrText = "You will see each image for 250ms. Can you find the target?";
    ModeBase.call(this, _name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs, instrText);

}

ShortVisibleSingleMode.prototype = Object.create(ModeBase.prototype);


ShortVisibleSingleMode.prototype.startRound = function() {

    //define where target goes
    var choiceArea = Math.floor((Math.random() * 4) + 1);
    this.targetDirection = choiceArea + "";

    this.roundRunning = true;
    var roundConfig = this.levels[this.currentRound];
    var mode = this;
    setTimeout(function() {
        mode.choiceDivs.empty();
        DrawUtils.drawDistractors(mode.distractorColorKeys, mode.distractorShapeKeys, mode.targetObject, roundConfig.distractors, roundConfig.distractorTypes, $("#up"));
        if (ModeBase.directions.up === mode.targetDirection) {
            mode.setTarget($("#up"));
        }
        setTimeout(function() {
            mode.choiceDivs.empty();
            DrawUtils.drawDistractors(mode.distractorColorKeys, mode.distractorShapeKeys, mode.targetObject, roundConfig.distractors, roundConfig.distractorTypes, $("#right"));
            if (ModeBase.directions.right === mode.targetDirection) {
                mode.setTarget($("#right"));
            }
            setTimeout(function() {
                mode.choiceDivs.empty();
                DrawUtils.drawDistractors(mode.distractorColorKeys, mode.distractorShapeKeys, mode.targetObject, roundConfig.distractors, roundConfig.distractorTypes, $("#down"));
                if (ModeBase.directions.down === mode.targetDirection) {
                    mode.setTarget($("#down"));
                }
                setTimeout(function() {
                    mode.choiceDivs.empty();
                    DrawUtils.drawDistractors(mode.distractorColorKeys, mode.distractorShapeKeys, mode.targetObject, roundConfig.distractors, roundConfig.distractorTypes, $("#left"));
                    if (ModeBase.directions.left === mode.targetDirection) {
                        mode.setTarget($("#left"));
                    }
                    setTimeout(function() {
                        mode.choiceDivs.empty();
                    }, 250);
                }, 250);
            }, 250);
        }, 250);
    }, 250);
};

ShortVisibleSingleMode.prototype.endRound = function(success) {
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
            mode.showLable(mode.labels[("round" + mode.currentRound)], 3000, mode.countdown(mode));
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



ShortVisibleSingleMode.prototype.keyPressed = function(direction) {
    if (this.roundRunning) {
        this.endRound(direction === this.targetDirection);
    }
};