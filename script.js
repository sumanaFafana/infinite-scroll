const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "alBWGs0U8V-xtzR94gT-5SkcSgWKR0fJKfDqycZA8No";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
  }
}

//Helper function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  // Run forEach for each object in the photosArray
  photosArray.forEach((photo) => {
    // Create an <a> to link to Unsplash
    const item = document.createElement("a");
    const itemAttributes = { href: photo.links.html, target: "_blank" };
    setAttributes(item, itemAttributes);

    // Create <img> for photo
    const img = document.createElement("img");
    const imgAttributes = {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    };
    setAttributes(img, imgAttributes);

    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside the <a>, then put both inside imageContainer Element
    item.append(img);
    imageContainer.append(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (e) {
    // Catch Error Here
  }
}

// Check to see if near bottom of page, Load  more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Onload
getPhotos();
