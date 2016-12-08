var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);
var secondImageLoader = document.getElementById('secondPhoto');
secondImageLoader.addEventListener('change', handleSecondImage, false);
var imageReplacer = document.getElementById('replaceImage');
imageReplacer.addEventListener('change', replaceImage, false);

var firstImageSource,
    secondImageSource;

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

function replaceImage(e) {

    var reader = new FileReader();
    reader.onload = function (event) {
        if ($('#structure').attr('src') == firstImageSource) {
            firstImageSource = event.target.result
            $('#structure').attr('src', firstImageSource)
        } else {
            secondImageSource = event.target.result
            $('#structure').attr('src', secondImageSource)
        }
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

function switchImages() {
    if ($('#structure').attr('src') == firstImageSource) {
        $('#structure').attr('src', secondImageSource)
    } else {
        $('#structure').attr('src', firstImageSource)
    }
}

var dropbox = document.getElementById("uploader");
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
    var dt = e.dataTransfer;
    var files = dt.files;

    imageLoader.files = files;
}
function drop2(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt = e.dataTransfer;
    var files = dt.files;

    secondImageLoader.files = files;
}