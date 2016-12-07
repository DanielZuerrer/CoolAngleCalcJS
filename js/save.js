document.addEventListener('keyup', saveMode, true);
var saveModeEngaged = false;
var originalStructureWidth = 0;

function saveMode(event) {
    if (event.altKey && event.keyCode == 83 && !saveModeEngaged) {
        saveModeEngaged = true;

        originalStructureWidth = $('.structureContainer').width()

        getImages();
        $('.structureContainer')
            .children()
            .hide();
        $('.structureContainer').append(structure1);
        $('.structureContainer').append(structure2);
        $('.structureContainer').width(0);

        $('#flipButton').hide();
        $('#replaceImageButton').hide();
        $('#switchImagesButton').hide();
        $('#secondUploader').hide();
        createTitle();
    } else if (event.altKey && event.keyCode == 83 && saveModeEngaged) {
        saveModeEngaged = false;
        removeTitle()

        $('#structure1').remove();
        $('#structure2').remove();
        $('.structureContainer').width(originalStructureWidth);
        $('.structureContainer')
            .children()
            .show();

        $('#flipButton').show();
        $('#replaceImageButton').show();
        $('#switchImagesButton').show();
        $('#secondUploader').show();
    }
}

var structure1 = null;
var structure2 = null;
function getImages() {
    vh = window.innerHeight;


    structure1 = $('<div id="structure1"></div>')
    structure1.append($('.structureContainer').html());
    structure1.height($('.structureContainer').height());
    structure1.attr('style', 'transform: matrix(0.5,0,0,0.5,0,'+-vh/15+')');
    switchImages();
    structure2 = $('<div id="structure2"></div>')
    structure2.append($('.structureContainer').html());
    structure2.height($('.structureContainer').height())
    structure2.attr('style', 'transform: matrix(0.5,0,0,0.5,0,0)');
    switchImages();
}

var title = "";
modalityForm.addEventListener('change', createTitle, false);
var otherModalityText = document.getElementById('otherModality');
otherModalityText.addEventListener('input', createTitle, false);
var bigInfoText = document.getElementById('bigInfo');
bigInfoText.addEventListener('input', createTitle, false);
function createTitle() {
    var bigInfo = $('#bigInfo').val();
    var modality = $('input[name=modality]:checked').val();
    if (modality == "Other") {
        modality = $('#otherModality').val();
    }
    var side = flipped
        ? "R"
        : "L";
    var degree = $('#degreeOutput')
        .text()
        .slice(0, -1);

    title = bigInfo + '_' + modality + '_' + side + '_' + degree;

    if (saveModeEngaged) {
        removeTitle();
        $('.structureContainer').prepend('<h1 id="fileName">' + title + '</h1>');
        var fileName = document.getElementById('fileName');
        fileName.addEventListener('click', copyToClipboard, false);
    }

}

function removeTitle() {
    $('#fileName').remove();
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", title);
}