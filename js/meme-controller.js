'use strict'

// var gImgs;
var gElCanvas;
var gCtx;
var gImg;
var gTextUp;
var gMeme;

function onOpenModel(id) {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.model').style.display = 'flex';
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    onPickedImg(id);
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function onPickedImg(id) {
    var img = getImgeById(id);
    gMeme = createMeme(img.id, img.url);
    drawImgFromlocal(gMeme.selectedImgurl);
}

function drawImgFromlocal(url) {
    gImg = new Image()
    gImg.src = url;
    gImg.onload = () => {
        gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height); 
    }
}

function onAddText(elInput) {
    clearCanvas();
    gTextUp = elInput.value;
    renderMeme(gTextUp);
    gMeme.lines[0] = gTextUp;
}

function drawText(text, align, x, y) {
    gCtx.lineWidth = '2';
    gCtx.font = '20px impact';
    gCtx.textAlign = align;
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(text, x, y);
    gCtx.fillStyle = 'white';
    gCtx.fillText(text, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme(txt) {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height); 
    drawText(txt, 'center', 100, 40)
}
