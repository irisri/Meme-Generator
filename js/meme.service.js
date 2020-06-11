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
    return {
        selectedImgId: id,
        selectedImgurl: url,
        selectedLineIdx: num,
        lines: []
    };
}

function getTextFromMeme() {
    return gMeme.lines[0].txt;
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