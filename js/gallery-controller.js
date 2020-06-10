'use strict'
var gImgs;

function init() {
    gImgs = getImags();
    setGallery();
}

function setGallery() {
    var gallery = document.querySelector('.gallery-container');
    var strHTML = gImgs.map(img => 
        `<img src="${img.url}" class="img" onclick="onOpenModel(${img.id})">`
    ).join('');
    gallery.innerHTML = strHTML;  
}