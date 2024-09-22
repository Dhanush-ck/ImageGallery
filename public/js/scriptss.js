//Second html

const slideshowContent = document.getElementById('slideshow-content');
// Slideshow image 
const slideshowPreview = document.getElementById('slideshow-preview');
// Previous icon 
const previous = document.getElementById('previous');
// Next icon 
const next = document.getElementById('next');
// Back icon / return icon 
const back =document.getElementById('back');

// Receiving image list from index.html 
const urlParams =  new URLSearchParams(window.location.search);
const values = urlParams.get('data');
const list = urlParams.get('list');
var valueArray = JSON.parse(decodeURIComponent(values));

var i=0;
var time = 5000;

// Function to automatically change the image in respective interval of time 
function changeImg() {
    setImage();
    (i<valueArray.length-1)?i++:i=0;
    setTimeout(changeImg, time);
}
// Calling the changeImg() function 
changeImg();

// To go to the next image 
next.onclick = ()=>{
    (i<valueArray.length-1)?i++:i=0;
    setImage();
}

// To go to the previous image 
previous.onclick = ()=> {
    (i>0)?i--:i=valueArray.length-1;
    setImage();
}

// To set the src of the slideshow image 
function setImage() {
    slideshowPreview.src = valueArray[i];
}

// To return to index.html 
back.onclick = ()=> {
    window.location.href = `./index.html?list=${encodeURIComponent(list)}`;
}