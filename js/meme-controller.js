'use strict'

// var gImgs;
var gElCanvas;
var gCtx;
var gImg;
// var gTextUp;
// var gTextDown;
var gMeme;
var gFontSize = 30;
// var gHeight = gFontSize + 10;

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
    if (elInput.name === 'line1') {
        gMeme.selectedLineIdx = 0;
        gMeme.lines[0] = {
            txt: elInput.value,
            size: 30,
            height: 40
        };
    } else {
        gMeme.selectedLineIdx = 1;
        gMeme.lines[1] = {
            txt: elInput.value,
            size: 30,
            height: gElCanvas.height - 10
        };

    }
    renderMeme()
}

function drawText(text, index, align, x, y) {
    gCtx.lineWidth = '2';
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px impact`;
    gCtx.textAlign = 'center';
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.strokeText(text, x, y);
    gCtx.fillText(text, x, y);
}

function onChangeFontSize(isAddFontSize) {
    if (!gMeme.lines) return
    (isAddFontSize) ? gMeme.lines[gMeme.selectedLineIdx].size += 10 : gMeme.lines[gMeme.selectedLineIdx].size -= 10;
    if (gMeme.selectedLineIdx === 0) {
        (isAddFontSize) ? gMeme.lines[gMeme.selectedLineIdx].height = gMeme.lines[gMeme.selectedLineIdx].size += 10 : 
        gMeme.lines[gMeme.selectedLineIdx].height = gMeme.lines[gMeme.selectedLineIdx].size -= 5
    } 
    renderMeme();
}

function onChangeHeight(isMovingUp) {
    if (isMovingUp) {
        if (gMeme.lines[gMeme.selectedLineIdx].height < gFontSize + 10) return;
        gMeme.lines[gMeme.selectedLineIdx].height -= 10;
    } else {
        if (gMeme.lines[gMeme.selectedLineIdx].height >= 530) return;
        gMeme.lines[gMeme.selectedLineIdx].height += 10;
    }
    renderMeme();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function renderMeme() {
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);
    var xCenter = gElCanvas.width / 2;
    if (gMeme.lines[0]) {
        drawText(gMeme.lines[0].txt, 0, 'center', xCenter, gMeme.lines[0].height);
        if (gMeme.lines[1]) drawText(gMeme.lines[1].txt, 1, 'center', xCenter, gMeme.lines[1].height);
    }
    if (gMeme.lines[1]) {
        drawText(gMeme.lines[1].txt, 1, 'center', xCenter, gMeme.lines[1].height);
        if (gMeme.lines[0]) drawText(gMeme.lines[0].txt, 0, 'center', xCenter, gMeme.lines[0].height);
    }
}


function onSenlectedInput(num) {
    gMeme.selectedLineIdx = num;
    console.log('working on line ', gMeme.selectedLineIdx)
}