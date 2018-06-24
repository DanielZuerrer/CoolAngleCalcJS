var degreesCanvas;
var degrees;

var redLine = new Propeller(document.getElementById('redLine'));
var redTriangle = {
    opp: 138,
    adj: 257,
    angle: 28.2,
    baseAngle: 0
};
redLine.angle = redTriangle.angle;
var redScaleX,
    redScaleY;

function addRedLineListeners() {
    $('.schabloneContainer').draggable()
    $('.schablone').resizable({
        containment: "#mainContainer",
        handles: "e, s, n, w",
        resize: function (event, ui) {
            redScaleX = ui.size.width / ui.originalSize.width;
            redScaleY = ui.size.height / ui.originalSize.height;
            if (flipped) {
                redTriangle.angle = Math.atan((-redScaleX * redTriangle.opp) / (redScaleY * redTriangle.adj)) * (180 / Math.PI);
            } else {
                redTriangle.angle = Math.atan((redScaleX * redTriangle.opp) / (redScaleY * redTriangle.adj)) * (180 / Math.PI);
            }
            redLine.angle = redTriangle.angle + redTriangle.baseAngle;
            updateCanvas();
        },
        stop: function (event, ui) {
            redTriangle.opp = redScaleX * redTriangle.opp;
            redTriangle.adj = redScaleY * redTriangle.adj;
        }
    })

    $('.rotateContainer').propeller({
        onRotate: function () {
            redTriangle.baseAngle = this.angle;
            redLine.angle = redTriangle.angle + redTriangle.baseAngle;
            updateCanvas();
        }
    });
}

var greenLine = new Propeller(document.getElementById('greenLine'));
greenLine.angle = 0;
var greenTimesX,
    greenTimesY;

function addGreenLineListeners() {
    $('.lineContainer').draggable()

    $('.lineRotateContainer').propeller({
        onRotate: function () {
            greenLine.angle = this.angle;
            updateCanvas();
        }
    });
}

function canvasInit() {
    degrees = document.getElementById("degrees");
    degreesCanvas = degrees.getContext("2d");
    updateCanvas();
}
function updateCanvas() {
    degreesCanvas.clearRect(0, 0, degrees.width, degrees.height);
    degreesCanvas.beginPath();
    if (flipped) {
        var end = (redLine.angle - 90) * (Math.PI / 180);
        var start = (greenLine.angle + 90) * (Math.PI / 180);

        redAngle = 360 - redLine.angle;
        if (greenLine.angle <= 180) {
            greenAngle = Math.abs(greenLine.angle - 180);
        } else {
            greenAngle = Math.abs(360 - greenLine.angle + 180)
        }

    } else {
        var start = (redLine.angle - 90) * (Math.PI / 180)
        var end = (greenLine.angle - 270) * (Math.PI / 180)

        redAngle = redLine.angle;
        greenAngle = (greenLine.angle + 180) % 360;
    }
    degreesCanvas.arc(125, 125, 50, start, end);
    degreesCanvas.stroke();
    segment = greenAngle - redAngle;
    segment = segment >= 0
        ? segment
        : (360 + segment);
    document
        .getElementById('degreeOutput')
        .innerText = round(segment, 2) + '°';
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}