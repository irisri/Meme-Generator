'use strict'

var gElCanvas;
var gCtx;
var gImg;
var gSelectedLineIdx = 0;
var gIsStrock;

function onOpenModel(id) {
    document.querySelector('.gallery-container').style.display = 'none';
    document.querySelector('.model').style.display = 'flex';
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
    onPickedImg(id);
}

function onShowGallery() {
    gMeme = null;
    document.querySelector('.gallery-container').style.display = 'grid';
    document.querySelector('.model').style.display = 'none';
    document.querySelector('[name=line]').value = '';
    toggleMenu();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function onPickedImg(id) {
    var img = getImgeById(id);
    createMeme(img.id, img.url);
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
    createTxt(gSelectedLineIdx, elInput.value, gElCanvas.width / 2);
    renderMeme()
}

function onChangeFontSize(isAddFontSize) {
    setFontSize(isAddFontSize, gSelectedLineIdx);
    renderMeme();
}

function onChangeHeight(gSelectedLineIdx, isMovingUp) {
    setHeight(gSelectedLineIdx, isMovingUp);
    renderMeme();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(line) {
    if (!line) return;
    gCtx.lineWidth = '4';
    gCtx.font = `${line.size}px impact`;
    gCtx.textAlign = line.align;
    gCtx.strokeStyle = line.strock;
    gCtx.fillStyle = line.fill;
    gCtx.strokeText(line.txt, line.width, line.height);
    gCtx.fillText(line.txt, line.width, line.height);
}

function renderMeme() {
    clearCanvas();
    gCtx.drawImage(gImg, 0, 0, gElCanvas.width, gElCanvas.height);

    var lines = returnLines();
    lines.forEach(line => drawText(line));
}

function OnSwitchLine() {
    (gSelectedLineIdx === 0) ? gSelectedLineIdx = 1 : gSelectedLineIdx = 0;
    var txt = getTxt(gSelectedLineIdx);
    document.querySelector('[name=line]').value = '';

    if (!txt) {
        (gSelectedLineIdx === 1) ? document.querySelector('[name=line]').placeholder = 'Second line' :
            document.querySelector('[name=line]').placeholder = 'First line';
    } else {
        document.querySelector('[name=line]').value = txt;
    }
}

function onAlign(align) {
    switch (align) {
        case 'left':
            setTxtAlign(gSelectedLineIdx, 'left', 10);
            break;
        case 'center':
            setTxtAlign(gSelectedLineIdx, 'center', gElCanvas.width / 2);
            break;
        case 'right':
            setTxtAlign(gSelectedLineIdx, 'right', gElCanvas.width - 10);
            break;
    }

    renderMeme();
}

function onOpenColor(isStrock) {
    gIsStrock = isStrock;
    var colorInput = document.querySelector('[type=color]')
    colorInput.value = '000';
    colorInput.click();
}

function onColorChange(elColor) {
    setColor(gSelectedLineIdx, gIsStrock, elColor.value);
    renderMeme()
}

function onRemove() {
    removeLineFromMeme(gSelectedLineIdx);
    document.querySelector('[name=line]').value = '';
    (gSelectedLineIdx === 1) ? document.querySelector('[name=line]').placeholder = 'Second line' :
        document.querySelector('[name=line]').placeholder = 'First line';
    renderMeme();
}

function downloadImg(ev) {
    const data = gElCanvas.toDataURL();
    ev.href = data;
    ev.download = 'my_pic';
}