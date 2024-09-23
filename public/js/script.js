// Preview Image 
const preview = document.getElementById('preview');
// Images in the gallery 
const items = document.querySelectorAll('.image-list');
// Close icon / X icon 
const close = document.getElementById('close');
// Edit icon, to replace the image 
const edit = document.getElementById('edit');
// Add icon / + icon 
const add = document.getElementById('add');
// Clear icon / - icon 
const clear = document.getElementById('clear');
// Play icon / slideshow icon 
const play = document.getElementById('play');
// Empty icon / delete icon 
const empty = document.getElementById('empty');

// Input tag for replacing an image, Edit 
var inputImage = document.getElementById('input-image');
// Input tag for adding new image, Add 
var addImage = document.getElementById('add-image');

// Parent class of the images in the gallery 
const category = document.getElementById('categories');
// Parent class of buttons and images 
const area = document.getElementById('area');

var currentItem, temp;

let mediaQuery = window.matchMedia("(max-width: 600px)");
let displayType ;

// To set display type according to the screen size 
function setDisplayType(e) {
    if(e.matches){
        displayType = "flex";
    }
    else {
        displayType = "block";
    }
}

mediaQuery.addListener(setDisplayType);

// Calling the setDisplayType() function to set the display type 
setDisplayType(mediaQuery);

// Function to trigger the preview 
function showImage(e) {
    currentItem = e;
    preview.src = e.src;
    area.classList.add('fadeOut');
    area.addEventListener('animationend', ()=>{
        area.style.display = 'none';
    })
    preview.style.display = 'block';
    close.style.display = 'block';
    edit.style.display = 'block';
    clear.style.display = 'block';
}

// Function for the close button 
close.addEventListener('click', function(){
    area.classList.remove('fadeOut');
    area.style.display = `${displayType}`;
    preview.classList.add('fadeOut');
    close.classList.add('fadeOut');
    edit.classList.add('fadeOut');
    clear.classList.add('fadeOut');
})

// Preview closing animation adjustments 
close.addEventListener('animationend', function() {
    if(preview.classList.contains('fadeOut')) {
        preview.classList.remove('fadeOut');
        close.classList.remove('fadeOut');
        edit.classList.remove('fadeOut');
        clear.classList.remove('fadeOut');
        preview.style.display = 'none';
        close.style.display = 'none';
        edit.style.display = 'none';
        clear.style.display = 'none';
        // preview.classList.add('fadeIn');
        preview.classList.add('zoomIn');
        close.classList.add('fadeIn');
        edit.classList.add('fadeIn');
        clear.classList.add('fadeIn');
    }
    else {
        preview.classList.remove('zoomIn');
        close.classList.remove('fadeIn');
        edit.classList.remove('fadeIn');
        clear.classList.remove('fadeIn');
        
    }
})

// Replacing image 
inputImage.onchange = function(){
    currentItem.src = URL.createObjectURL(inputImage.files[0]);
    preview.src = currentItem.src;
}

// Adding new image to the gallery 
addImage.onchange = function() {
    temp = URL.createObjectURL(addImage.files[0]);
    category.innerHTML+= `<div class="item"><img src="${temp}" class="image-list" onclick="showImage(this)"></div>`;
    adjustGrid();
    selectImages();
    category.style.display = "grid";
}

// Removing one image from the gallery 
clear.onclick = ()=>{
    const deleteItem = currentItem.parentElement;
    deleteItem.remove();
    preview.src=" ";
    adjustGrid();
    selectImages();
    area.classList.remove('fadeOut');
    area.style.display = `${displayType}`;
    preview.style.display = "none";
    close.style.display = "none";
    edit.style.display = "none";
    clear.style.display = "none";
}

// To remove all the images from the gallery 
empty.onclick = ()=>{
    category.innerHTML ="";
    category.style.display = "none";
}

// var count=1;

// Adjust the alignment of the images according to the number of images 
function adjustGrid() {
    const container = document.getElementById('categories');
    const items = container.children.length;
    var columns = Math.sqrt(items);
    if(columns>0 && columns<1){
        columns = Math.ceil(columns);
    }
    else {
        columns = Math.floor(columns);
    }
    
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    // console.log(count);
    // count++;
}

// Calling the adjustGrid() function 
adjustGrid();

var imageElements;

// Storing the image elements in the gallery 
function selectImages(){
    imageElements = document.querySelectorAll('.item img');
}

// Redirecting to slideshow and passing the list of images present in the gallery 
play.onclick = ()=> {
    // const imageList = category.innerHTML;

    selectImages();
    area.style.display = "none";
    slideshowContent.style.display = "flex";
    // const imageArray = Array.from(imageElements).map(img=>img.src);
    // const encodedImages = encodeURIComponent(JSON.stringify(imageArray));
    // window.location.href = `./slideshow.html?data=${encodedImages}&list=${imageList}`;
    // window.location.href = `./slideshow.html?data=${encodeURIComponent(encodedImages)}&list=${encodeURIComponent(imageList)}`;

}

// Receiving current image elements from slideshow.html 
// const urlParams =  new URLSearchParams(window.location.search);
// const list = urlParams.get('list');

// Adjusting the gallery after returning from the slideshow 
// if(list){
//     category.innerHTML=list;
//     adjustGrid();
// }



const slideshowContent = document.getElementById('slideshow-content');
// Slideshow image 
const slideshowPreview = document.getElementById('slideshow-preview');
// Previous icon 
const previous = document.getElementById('previous');
// Next icon 
const next = document.getElementById('next');
// Back icon / return icon 
const back =document.getElementById('back');

var i=0;
var time = 5000;

// Function to automatically change the image in respective interval of time 
function changeImg() {
    setImage();
    (i<items.length-1)?i++:i=0;
    setTimeout(changeImg, time);
    console.log(i);
}
// Calling the changeImg() function 
changeImg();

// To go to the next image 
next.onclick = ()=>{
    (i<items.length-1)?i++:i=0;
    setImage();
}

// To go to the previous image 
previous.onclick = ()=> {
    (i>0)?i--:i=items.length-1;
    setImage();
}

// To set the src of the slideshow image 
function setImage() {
    slideshowPreview.src = items[i].src;
}

back.onclick = ()=> {
    area.style.display = `${displayType}`;
    slideshowContent.style.display = "none";
}