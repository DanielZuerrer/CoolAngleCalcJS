var flipped = false;

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
    $('.sideLetter').toggleClass('activeSide');
    updateCanvas();
}

function switchImages() {
    if ($('#structure').attr('src') == firstImageSource) {
        $('#structure').attr('src', secondImageSource)
    } else {
        $('#structure').attr('src', firstImageSource)
    }
}

var modalityForm = document.getElementById('modalityForm');
modalityForm.addEventListener('change', otherModality, false);
function otherModality() {
    if ($('#otherRadio').prop('checked')) {
        $('#otherModality').css("display", "inline-block")
    } else {
        $('#otherModality').css("display", "none")
    }
}

function flipShortcut(event) {
    if (event.altKey && event.keyCode == 65) {
        flipSchablone();
    }

}
function replaceShortcut(event) {
    if (event.altKey && event.keyCode == 82) {
        $('#replaceImage').click();
    }

}
function switchShortcut(event) {
    if (event.altKey && event.keyCode == 87) {
        switchImages();
    }

}

$(document)
    .ready(function () {
        addRedLineListeners();
        addGreenLineListeners();
        canvasInit();
        flipSchablone();

        document.addEventListener('keyup', flipShortcut, true);
        document.addEventListener('keyup', replaceShortcut, true);
        document.addEventListener('keyup', switchShortcut, true);

    });
