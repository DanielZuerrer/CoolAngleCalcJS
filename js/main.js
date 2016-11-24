var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);
var secondImageLoader = document.getElementById('secondPhoto');
secondImageLoader.addEventListener('change', handleSecondImage, false);

var firstImageSource, secondImageSource;

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#uploader').remove();
        $('#filePhoto').remove();
        firstImageSource = event.target.result
        $('#structure').attr('src', firstImageSource);
        $('#mainContainer').height($('#structure').height())
        $('.structureContainer').width($('#structure').width())
        $('.hidden').toggleClass("hidden")

    };
    reader.readAsDataURL(e.target.files[0]);

}
function handleSecondImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#secondUploader').remove();
        $('#secondPhoto').remove();
        secondImageSource = event.target.result
        $('#structure').attr('src', secondImageSource);
        $('.hidden-switch').toggleClass('hidden-switch')
    };
    reader.readAsDataURL(e.target.files[0]);

}

var dropbox;
dropbox = document.getElementById("uploader");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

var secondDropbox = document.getElementById("secondUploader");
secondDropbox.addEventListener("dragenter", dragenter, false);
secondDropbox.addEventListener("dragover", dragover, false);
secondDropbox.addEventListener("drop", drop2, false);

function dragenter(e) {
    console.log('dragenter')
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    console.log('dragover')
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    //you can check e's properties console.log(e);
    var dt = e.dataTransfer;
    var files = dt.files;

    //this code line fires your 'handleImage' function (imageLoader change event)
    imageLoader.files = files;
}
function drop2(e) {
    e.stopPropagation();
    e.preventDefault();
    //you can check e's properties console.log(e);
    var dt = e.dataTransfer;
    var files = dt.files;

    //this code line fires your 'handleImage' function (imageLoader change event)
    secondImageLoader.files = files;
}

var degreesCanvas;
var degrees;
var flipped = false;

$(function () {
    addRedLineListeners();
    addGreenLineListeners();
    canvasInit();
});

var redLine = new Propeller(document.getElementById('redLine'));
var redTriangle = {
    opp: 138,
    adj: 250,
    angle: 28,
    baseAngle: 0
};
redLine.angle = redTriangle.angle;
var redTimesX,
    redTimesY;

function addRedLineListeners() {
    $('.schabloneContainer').draggable()
    $('.schablone').resizable({
        containment: "#mainContainer",
        handles: "e, s, n, w",
        resize: function (event, ui) {
            redTimesX = ui.size.width / ui.originalSize.width;
            redTimesY = ui.size.height / ui.originalSize.height;
            if (flipped) {
                redTriangle.angle = Math.atan((-redTimesX * redTriangle.opp) / (redTimesY * redTriangle.adj)) * (180 / Math.PI);
            } else {
                redTriangle.angle = Math.atan((redTimesX * redTriangle.opp) / (redTimesY * redTriangle.adj)) * (180 / Math.PI);
            }
            redLine.angle = redTriangle.angle + redTriangle.baseAngle;
            updateCanvas();
        },
        stop: function (event, ui) {
            redTriangle.opp = redTimesX * redTriangle.opp;
            redTriangle.adj = redTimesY * redTriangle.adj;
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

function fixRedPosition() {
    $('.schabloneContainer').draggable("destroy");
    $('.schablone').resizable("destroy");
}
function fixGreenPosition() {
    $('.lineContainer').draggable("destroy");
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
        greenAngle = Math.abs(greenLine.angle - 180);

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

function flipSchablone() {
    flipped = !flipped;
    if (flipped) {
        $('.schablone').attr('src', 'img/schabloneR.png');
        redTriangle.angle = -redTriangle.angle;
    } else {
        $('.schablone').attr('src', 'img/schabloneL.png');
        redTriangle.angle = -redTriangle.angle;
    }
    redLine.angle = redTriangle.angle + redTriangle.baseAngle;
    updateCanvas();
}

function switchImages() {
    if ($('#structure').attr('src') == firstImageSource) {
        $('#structure').attr('src',secondImageSource)
    } else {
        $('#structure').attr('src',firstImageSource)
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}