const imageContainer = document.getElementById('image-container');
const loaderSpinner = document.getElementById('loader');
let ready =false;
let imagesLoaded=0;
let totalImages=0;
let photosArray =[];
let isInitialLoad = true;


// Unsplash API 
let initialCount = 5;
const apiKey = '2LpBbn64YgrHG1u-AGzjq6qZ67sLmEfBNnLcBzua-qk';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


// new block for new count update to API
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
  }

// check if all images were loaded
function imageLoaded(){

   imagesLoaded++;

   if(imagesLoaded === totalImages){
    ready= true;
    loaderSpinner.hidden =true;


   }
}
// DRY dont repeat yourself - create helper function to not keep repeating the attributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// create elements for links and photos added to DOm
function displayPhotos() {
    imagesLoaded= 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);

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
});

// event listener check when each is finished loading
img.addEventListener('load', imageLoaded);


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
    if(isInitialLoad){
        updateAPIURLWithNewCount(30);
        isInitialLoad =false;
    }
    }catch(error){

    };
}
// check if to seee scrollig near bottom
window.addEventListener('scroll',()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotosFromUnsplash();
    }
});

// onload
getPhotosFromUnsplash();