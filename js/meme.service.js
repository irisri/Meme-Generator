'use strict'

// var gId = 0;
const KEY = 'imges';
var gImgs = _createImgs();
var gMeme;

var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

// var gImgs = [{
//     id: 1,
//     url: 'meme-imgs(square)/1.jpg',
//     keywords: ['donald trump']
// }];

// gMeme = {
//     selectedImgId: 1,
//     selectedLineIdx: 0,
//     lines: [{
//         txt: 'I never eat Falafel',
//         size: 20, 
//         align: 'left', 
//         color: 'red'
//     }]
// }

function createMeme(id, url, num = 0) {
    gMeme = {
        selectedImgId: id,
        selectedImgurl: url,
        selectedLineIdx: num,
        lines: []
    };
    // return {
    //     selectedImgId: id,
    //     selectedImgurl: url,
    //     selectedLineIdx: num,
    //     lines: []
    // };
}

function createLines(index) {
    gMeme.lines[index] = {
        txt: null,
        size: 30,
        align: 'center',
        height: 30,
        strock: '#000',
        fill: '#fff'
    }
}

function isThereLine(index) {
    if (!gMeme.lines[index]) createLines(index);
}

function setColor(index, isStrock, color) {
    isThereLine(index);
    (isStrock) ? gMeme.lines[index].strock = color : gMeme.lines[index].fill = color;
}

function returnLines() {
    return gMeme.lines;
}

function createTxt(index, txt, width) {
    isThereLine(index)
    gMeme.lines[index].txt = txt;
    // console.log(gMeme.lines[index].txt)
    gMeme.lines[index].width = width;
}

function setTxtAlign(index, align, width) {
    isThereLine(index)
    gMeme.lines[index].align = align;
    gMeme.lines[index].width = width;
}

function setFontSize(isAddFontSize, index) {
    isThereLine(index)
    if (isAddFontSize) {
        if (gMeme.lines[index].size + 10 > 70) return;
        gMeme.lines[index].size += 10;
        gMeme.lines[index].height = gMeme.lines[index].size + 10;
    } else {
        if (gMeme.lines[index].size - 10 < 30) return;
        gMeme.lines[index].size -= 10;
        gMeme.lines[index].height = gMeme.lines[index].size - 10;
    }
}

function removeLineFromMeme(index) {
    if (gMeme.lines === 0) return;
    gMeme.lines[index] = null;
}

function setHeight(index, isMovingUp) {
    isThereLine(index)
    if (isMovingUp) {
        if (gMeme.lines[index].height < gMeme.lines[index].size + 10) return;
        gMeme.lines[index].height -= 10;
    } else {
        if (gMeme.lines[index].height >= 530) return;
        gMeme.lines[index].height += 10;
    }
}

function getTxt(index) {
    isThereLine(index);
    return (gMeme.lines[index].txt) ? gMeme.lines[index].txt : false;
}

function getImags() {
    return gImgs;
}

function _createImgs() {
    var imgs = loadFromStorage(KEY);
    if (!imgs || !imgs.length) {
        var imgs = [];
        for (var i = 0; i < 18; i++) {
            imgs.push(_createImg(i + 1));
        }
        saveToStorage(KEY, imgs);
    }
    return imgs;
}

function _createImg(id) {
    return {
        id: id,
        url: `img/meme-imgs(square)/${id}.jpg`
    }
}

function getImgeById(id) {
    return gImgs.find(img => img.id === id);
}