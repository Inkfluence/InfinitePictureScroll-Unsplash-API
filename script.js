// Unsplash API 
const count = 10;
const apiKey = 'hxDjevI5TzTetX68mggWJQ7qFtsbjC6BZwh2emSn83o';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API 
async function getPhotosFromUnsplash(){
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    }catch(error){

    };
}

// onload
getPhotosFromUnsplash();