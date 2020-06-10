'use strict'

var gImgs;
var gElCanvas;
var gCtx;
var gTextUp;

function init() {
    gImgs = getImags();
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    onPickedImg();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function onPickedImg() {
    var img = getImgeById(1);
    drawImgFromlocal(img.url);
}

function getImgeById(id) {
    return gImgs.find(img => img.id === id);
}

function drawImgFromlocal(url) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) 
    }
}

function onAddText(elInput) {
    // console.log('add')
    var gTextUp = getTextFromMeme();
    // gTextUp = elInput.value;
    drawText(gTextUp, 'center', 100, 40)
}

function drawText(text, align, x, y) {
    gCtx.lineWidth = '2';
    gCtx.font = '20px sans-serif';
    gCtx.textAlign = align;
    gCtx.strokeStyle = 'black';
    gCtx.strokeText(text, x, y);
    gCtx.fillStyle = 'white';
    gCtx.fillText(text, x, y);
}
