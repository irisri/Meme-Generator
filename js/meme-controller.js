'use strict'

var gElCanvas;
var gCtx;
var gImg;
var gMeme;
var gFontSize = 30;
var gAlign = 'center';
var gWidth;

function onOpenModel(id) {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.model').style.display = 'flex';
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    onPickedImg(id);
}

function onHideModel() {
    document.querySelector('.gallery-container').style.display = 'grid';
    document.querySelector('.model').style.display = 'none';
    document.querySelector('[name=line]').value = '';
    gMeme = null;
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    gWidth = gElCanvas.width / 2;
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

    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[gMeme.selectedLineIdx] = {
            txt: elInput.value,
            size: 30,
            align: gAlign,
            height: 40,
            width: gWidth
        };
    } else {
        gMeme.lines[gMeme.selectedLineIdx] = {
            txt: elInput.value,
            size: 30,
            align: gAlign,
            height: gElCanvas.height - 10,
            width: gWidth
        };
    }
    renderMeme()
}

function drawText(index) {
    if (gMeme.lines[index] === 'undefined') return
    var meme = gMeme.lines[index];
    gCtx.lineWidth = '2';
    gCtx.font = `${meme.size}px impact`;
    gCtx.textAlign = meme.align;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.strokeText(meme.txt, meme.width, meme.height);
    gCtx.fillText(meme.txt, meme.width, meme.height);
}

function onChangeFontSize(isAddFontSize) {
    if (gMeme.lines.length === 0) return
    (isAddFontSize) ? gMeme.lines[gMeme.selectedLineIdx].size += 10 : gMeme.lines[gMeme.selectedLineIdx].size -= 10;
    if (gMeme.selectedLineIdx === 0) {
        (isAddFontSize) ? gMeme.lines[gMeme.selectedLineIdx].height = gMeme.lines[gMeme.selectedLineIdx].size += 10 :
            gMeme.lines[gMeme.selectedLineIdx].height = gMeme.lines[gMeme.selectedLineIdx].size -= 5
    }
    renderMeme();
}

function onChangeHeight(isMovingUp) {
    if (isMovingUp) {
        if (gMeme.lines[gMeme.selectedLineIdx].height < gMeme.lines[gMeme.selectedLineIdx].size + 10) return;
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
    if (gMeme.lines[0]) {
        drawText(0);
        if (gMeme.lines[1]) drawText(1);
    }
    if (gMeme.lines[1]) {
        drawText(1);
        if (gMeme.lines[0]) drawText(0);
    }
}

function OnSwitchLine() {
    (gMeme.selectedLineIdx === 0) ? document.querySelector('[name=line]').placeholder = 'Second line' :
        document.querySelector('[name=line]').placeholder = 'First line';

    (gMeme.selectedLineIdx === 0) ? gMeme.selectedLineIdx = 1 : gMeme.selectedLineIdx = 0;
    document.querySelector('[name=line]').value = '';
}

function onAlign(align) {
    switch (align) {
        case 'left':
            gWidth = 10;
            break;
        case 'center':
            gWidth = gElCanvas.width / 2;
            break;
        case 'right':
            gWidth = gElCanvas.width - 10;
            break;
    }
    gAlign = align;
    if (gMeme.lines.length > 0) {
        gMeme.lines[gMeme.selectedLineIdx].align = align;
        gMeme.lines[gMeme.selectedLineIdx].width = gWidth;
        renderMeme();
    }
}