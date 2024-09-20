//Second html

const slideshowContent = document.getElementById('slideshow-content');
const slideshowPreview = document.getElementById('slideshow-preview');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const back =document.getElementById('back');

const urlParams =  new URLSearchParams(window.location.search);
const values = urlParams.get('data');
const list = urlParams.get('list');
var valueArray = JSON.parse(decodeURIComponent(values));
// var images = valueArray;

var i=0;
var time = 5000;

function changeImg() {
    setImage();
    (i<valueArray.length-1)?i++:i=0;
    setTimeout(changeImg, time);
}
changeImg();

next.onclick = ()=>{
    (i<valueArray.length-1)?i++:i=0;
    setImage();
}

previous.onclick = ()=> {
    (i>0)?i--:i=valueArray.length-1;
    setImage();
}

function setImage() {
    slideshowPreview.src = valueArray[i];
}

back.onclick = ()=> {
    window.location.href = `./index.html?list=${encodeURIComponent(list)}`;
}