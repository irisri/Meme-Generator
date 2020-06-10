'use strict'

// var gImgs;
var gElCanvas;
var gCtx;
var gImg;
var gTextUp;
var gMeme;
var gFontSize = 30;
var gHeight = gFontSize + 10;

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
    gCtx.font = `${gFontSize}px impact`;
    gCtx.textAlign = 'center';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.strokeText(text, x, y);
    gCtx.fillText(text, x, y);
}

function onChangeFontSize(isAdd) {
    (isAdd) ? gFontSize += 10 : gFontSize -= 10;
    console.log(gFontSize);
    renderMeme(gTextUp);
}

function onChangeHeight(isUp) {
    if (!gTextUp) return;
    if (isUp) {
        if (gHeight === 30) return;
        gHeight -= 10;
    } else {
        if (gHeight === 530) return;
        gHeight += 10;
    }
    renderMeme(gTextUp);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme(txt) {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
    var xCenter = gElCanvas.width / 2;
    drawText(txt, 'center', xCenter, gHeight);
}
