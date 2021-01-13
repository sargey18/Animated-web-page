const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let pohotosArray = [];

// Unsplash
const count = 30;
const apiKey = '8jfGbtRIRD3V1sIcSS4krKnhWMAplWeWWVW207oeNOc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//helper function to set attributes on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}



//create elements for links & photos, add to dom 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = pohotosArray.length;
    console.log('total images', totalImages);
    //run function for each object in photosArray
    pohotosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a'); //create an anchor tag 
     //   item.setAttribute('href', photo.links.html); //give the item variable/constant the fetched data from the api, photo links and html
     //   item.setAttribute('target', '_blank'); //open in a new tab, attribute target blank
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
     //   img.setAttribute('src', photo.urls.regular);
     //   img.setAttribute('alt', photo.alt_description);
     //   img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //put <img> inside <a>, then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        pohotosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //catch error here 
    }
}

//check to see if scrilling near bottom of page, load more photos 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

//On load 
getPhotos();