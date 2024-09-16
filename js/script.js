const preview = document.getElementById('preview');
const items = document.querySelectorAll('.image-list');
const close = document.getElementById('close');
const edit = document.getElementById('edit');
var inputImage = document.getElementById('input-image');
const category = document.getElementById('categories');
var currentItem;

items.forEach(
    (item, index)=> {
        item.addEventListener('click', function(){
            // console.log(index);
            currentItem = item;
            preview.src = item.src;
            category.classList.add('fadeOut');
            category.addEventListener('animationend', ()=>{
                category.style.display = 'none';
            })
            preview.style.display = 'block';
            close.style.display = 'block';
            edit.style.display = 'block';
        })
    }
)

close.addEventListener('click', function(){
    category.classList.remove('fadeOut');
    category.style.display = 'grid';
    preview.classList.add('fadeOut');
    close.classList.add('fadeOut');
    edit.classList.add('fadeOut');
})

close.addEventListener('animationend', function() {
    if(preview.classList.contains('fadeOut')) {
        preview.classList.remove('fadeOut');
        close.classList.remove('fadeOut');
        edit.classList.remove('fadeOut');
        preview.style.display = 'none';
        close.style.display = 'none';
        edit.style.display = 'none';
        // preview.classList.add('fadeIn');
        preview.classList.add('zoomIn');
        close.classList.add('fadeIn');
        edit.classList.add('fadeIn');
    }
    else {
        preview.classList.remove('zoomIn');
        close.classList.remove('fadeIn');
        edit.classList.remove('fadeIn');
        
    }
})

inputImage.onchange = function(){
    currentItem.src = URL.createObjectURL(inputImage.files[0]);
    preview.src = currentItem.src;
}