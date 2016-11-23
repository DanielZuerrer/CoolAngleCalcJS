var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        $('#uploader').remove();
        $('input').remove();
        $('#structure').attr('src', event.target.result);
        $('#mainContainer').height($('#structure').height())

        $('.hidden').toggleClass("hidden")

    };
    reader.readAsDataURL(e.target.files[0]);

}

var dropbox;
dropbox = document.getElementById("uploader");
dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
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

var degreesCanvas;
var degrees;

$(function () {
    addRedLineListeners();
    addGreenLineListeners();
    canvasInit();
});

var redLine = new Propeller(document.getElementById('redLine'));
var redTriangle = {
    opp: 138,
    adj: 250,
    angle: 28.89869,
    baseAngle: 0
};
redLine.angle = redTriangle.angle;
var redTimesX,
    redTimesY;

function addRedLineListeners() {
    $('#schabloneContainer').draggable({containment: "parent"})
    $('#schablone').resizable({
        containment: "#mainContainer",
        handles: "e, s, n, w",
        resize: function (event, ui) {
            redTimesX = ui.size.width / ui.originalSize.width;
            redTimesY = ui.size.height / ui.originalSize.height;
            redTriangle.angle = Math.atan((redTimesX * redTriangle.opp) / (redTimesY * redTriangle.adj)) * (180 / Math.PI);
            redLine.angle = redTriangle.angle + redTriangle.baseAngle;
            updateCanvas();
        },
        stop: function (event, ui) {
            redTriangle.opp = redTimesX * redTriangle.opp;
            redTriangle.adj = redTimesY * redTriangle.adj;
        }
    })

    $('#rotateContainer').propeller({
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
    $('#lineContainer').draggable()

    $('#lineRotateContainer').propeller({
        onRotate: function () {
            greenLine.angle = this.angle;
            updateCanvas();
        }
    });
}

function fixRedPosition() {
    $('#schabloneContainer').draggable("destroy");
    $('#schablone').resizable("destroy");
}
function fixGreenPosition() {
    $('#lineContainer').draggable("destroy");
}

function canvasInit() {
    degrees = document.getElementById("degrees");
    degreesCanvas = degrees.getContext("2d");
    updateCanvas();
}
function updateCanvas() {
    degreesCanvas.clearRect(0, 0, degrees.width, degrees.height);
    degreesCanvas.beginPath();
    var start = (redLine.angle - 90) * (Math.PI / 180)
    var end = (greenLine.angle - 270) * (Math.PI / 180)

    segment = (end - start) * (180 / Math.PI);
    console.log(segment)
    segment = segment >= 0 ? segment : (360 + segment);

    degreesCanvas.arc(125, 125, 50, start, end);
    degreesCanvas.fillText(segment + '°', 10, 50);
    degreesCanvas.stroke();
}