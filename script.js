const imageContainer = document.getElementById('image-container');
const loaderSpinner = document.getElementById('loader');

let photosArray =[];

// Unsplash API 
const count = 10;
const apiKey = 'hxDjevI5TzTetX68mggWJQ7qFtsbjC6BZwh2emSn83o';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// DRY dont repeat yourself - create hgelper function to not keep repeating the attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links and photos added to DOm
function displayPhotos() {

    // for each object in photosArray run function 
photosArray.forEach((photo) => {

// create <a> to link unsplash 
const item = document.createElement('a');

setAttributes(item, {
    href:photo.links.html,
    target: '_blank',
});
// create <img for photo
const img = document.createElement('img');
setAttributes(img, {
    src: photo.urls.regular,
    alt:photo.alt_description,
    title:photo.alt_description,
})
// img.setAttribute('src', photo.urls.regular);
// img.setAttribute('alt', photo.alt_description);
// img.setAttribute('title',photo.alt_description);

// put image inside anchor element<img> inside <a>
item.appendChild(img);
imageContainer.appendChild(item);

});
}

// Get photos from Unsplash API 
async function getPhotosFromUnsplash(){
    try{
        const response = await fetch(apiUrl);
      photosArray = await response.json();

    displayPhotos();
    }catch(error){

    };
}
// check if to seee scrollig near bottom
window.addEventListener('scroll',()=> {
    console.log('scrolled');
});

// onload
getPhotosFromUnsplash();