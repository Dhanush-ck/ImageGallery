const preview = document.getElementById('preview');
const items = document.querySelectorAll('.image-list');
const close = document.getElementById('close');
const edit = document.getElementById('edit');
const add = document.getElementById('add');
const clear = document.getElementById('clear');

var inputImage = document.getElementById('input-image');
var addImage = document.getElementById('add-image');

const category = document.getElementById('categories');
const area = document.getElementById('area');

var currentItem, temp;

// items.forEach(
//     (item, index)=> {
//         item.addEventListener('click', function(){
//             console.log(index);
//             currentItem = item;
//             preview.src = item.src;
//             area.classList.add('fadeOut');
//             area.addEventListener('animationend', ()=>{
//                 area.style.display = 'none';
//             })
//             preview.style.display = 'block';
//             close.style.display = 'block';
//             edit.style.display = 'block';
//         })
//     }
// )

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

close.addEventListener('click', function(){
    area.classList.remove('fadeOut');
    area.style.display = 'grid';
    preview.classList.add('fadeOut');
    close.classList.add('fadeOut');
    edit.classList.add('fadeOut');
    clear.classList.add('fadeOut');
})

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

inputImage.onchange = function(){
    currentItem.src = URL.createObjectURL(inputImage.files[0]);
    preview.src = currentItem.src;
}

addImage.onchange = function() {
    temp = URL.createObjectURL(addImage.files[0]);
    category.innerHTML+= `<div class="item"><img src="${temp}" class="image-list" onclick="showImage(this)"></div>`;
}

clear.onclick = ()=>{
    const deleteItem = currentItem.parentElement;
    deleteItem.remove();
    preview.src=" ";
}