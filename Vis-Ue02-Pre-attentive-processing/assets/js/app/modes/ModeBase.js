/*
 ModeBase class
 
 Julius Seltenheim (2013)
 
 Feel free to use.
 
 */

window.ModeBase = ModeBase;

ModeBase.directions = {
    1: "left",
    2: "up",
    3: "right",
    4: "down",
    left: "1",
    up: "2",
    right: "3",
    down: "4"
};



function ModeBase(_name, levelDefinitions, labelDefinitions, _distractorColorKeys, _distractorShapeKeys, _targetObject, _overlayDiv, _timerSpan, _choiceDivs, _instructionsText) {
    this.name = _name;
    this.levels = levelDefinitions;
    this.levelCount = Object.keys(levelDefinitions).length;
    this.labels = labelDefinitions;
    this.distractorColorKeys = _distractorColorKeys;
    this.distractorShapeKeys = _distractorShapeKeys;
    this.targetObject = _targetObject;
    this.overlayDiv = $(_overlayDiv);
    this.overlayDiv.empty();
    this.overlaySpan = $(document.createElement("span"));
    this.overlaySpan.toggleClass("lead");
    this.overlayDiv.append(this.overlaySpan);
    this.timerSpan = $(_timerSpan);
    this.currentRound = -1;
    this.choiceDivs = _choiceDivs;
    this.roundRunning = false;
    this.roundStartTime = null;
    this.targetDirection = null;
    this.counddownInterval = null;
    this.onFinishCallback = null;
    this.instructionsText = _instructionsText;
    this.results = {};
}

ModeBase.prototype.countdown = function(mode) {
    var timerSpan = mode.timerSpan;

    if (timerSpan.text() === "") {
        //starting timer
        timerSpan.text("3");
        this.countdownInterval = window.setInterval(function() {
            mode.countdown(mode);
        }, 1000);
    } else if (timerSpan.text() === "Go!") {
        window.clearInterval(this.countdownInterval);
        timerSpan.text("");
        this.startRound();
    } else {
        var timeLeft = parseInt(timerSpan.text()) - 1;
        if (timeLeft > 0)
            timerSpan.text(timeLeft);
        if (timeLeft === 0) {
            timerSpan.text("Go!");
        }
    }

};

ModeBase.prototype.start = function(_onFinishCallback) {
    this.onFinishCallback = _onFinishCallback;
    var mode = this;
    this.currentRound = 1;
    this.showLable(this.instructionsText, 5000, function() {
        mode.showLable(mode.labels.round1, 3000, function() {
            mode.countdown(mode);
        });
    });


    $(document).keydown(function(e) {
        if (e.keyCode === 37) { //left
            mode.keyPressed(ModeBase.directions.left);
            return false;
        } else if (e.keyCode === 38) { //up
            mode.keyPressed(ModeBase.directions.up);
            return false;
        } else if (e.keyCode === 39) { //right
            mode.keyPressed(ModeBase.directions.right);
            return false;
        } else if (e.keyCode === 40) { //down
            mode.keyPressed(ModeBase.directions.down);
            return false;
        }
    });
};

ModeBase.prototype.showLable = function(text, fadeOutDuration, onFinishCallback) {
    $(this.overlaySpan).text(text);
    this.overlayDiv.show();
    this.overlayDiv.fadeOut(fadeOutDuration, onFinishCallback);
};

ModeBase.prototype.setDistractors = function(count, variance) {
    DrawUtils.drawDistractors(this.distractorColorKeys, this.distractorShapeKeys, this.targetObject, count, variance, this.choiceDivs);
};

ModeBase.prototype.setTarget = function(area) {
    DrawUtils.drawTarget(this.targetObject, area);
};
