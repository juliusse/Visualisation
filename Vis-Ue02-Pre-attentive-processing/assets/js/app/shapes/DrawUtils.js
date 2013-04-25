/*
 DrawUtils class
 
 Julius Seltenheim (2013)
 
 Feel free to use.
 
 */


window.DrawUtils = DrawUtils;


function DrawUtils() {

}
;

DrawUtils.colors = {
    red: "#b94a48",
    blue: "#336699",
    yellow: "#c09853",
    green: "#468847",
    violet: "#913b8e"
};

DrawUtils.shapes = {
    circle: Circle,
    square: Square,
    triangle: Triangle,
    star: Star
};

DrawUtils.drawDistractors = function(_colorKeys, _shapeKeys, targetObject, count, _variance, areas) {
//fixme: hack for conjunction
    var isConjunction = (_colorKeys.length > 1 && _shapeKeys.length > 1);
    var variance = isConjunction ? _variance+1 : _variance;


    //generate color keys
    var colorKeys = _colorKeys.slice(0);
    while (variance < colorKeys.length) {
        colorKeys.splice(colorKeys.length - 1, 1);
    }

    //generate shape keys
    var shapeKeys = _shapeKeys.slice(0);
    while (variance < shapeKeys.length) {
        shapeKeys.splice(shapeKeys.length - 1, 1);
    }

    var colors = DrawUtils.colors;
    var shapes = DrawUtils.shapes;

    $(areas).each(function(index) {
        for (var i = 0; i < count; i++) {
            var shapeKey = null;
            var color = null;

            shapeKey = shapeKeys[Math.floor((Math.random() * shapeKeys.length))];
            color = colors[colorKeys[Math.floor((Math.random() * colorKeys.length))]];
            while (targetObject !== null && targetObject.getColor() === color && targetObject.toString() === shapeKey) {
                color = colors[colorKeys[Math.floor((Math.random() * colorKeys.length))]];
            }

            var shapeType = shapes[shapeKey];
            var shape = new shapeType(20, color);
            shape.appendTo($(this));
        }
    });

};

DrawUtils.drawTarget = function(target, area) {
    target.appendTo($(area));
};