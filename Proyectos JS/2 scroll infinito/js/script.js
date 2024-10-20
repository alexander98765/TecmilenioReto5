/**
 * @fileOverview File to handle infinite scroll
 * @author Perez, Alejandro
 * @version 1.0.0
 */

//Select page container
const container = document.querySelector('.container');

/**
 * Function to get random images to show in page
 * 
 * @param {int} numImages Total images to retrieve each round 
 */
function loadImages(numImages = 10) {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${numImages}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(imageData => {
            const img = document.createElement('img');
            img.src = imageData.url;
            img.width = 550;
            img.height = 500;
            container.appendChild(img);
        });
    })
    .catch(error => console.error('Error al cargar las imágenes:', error));
}
   

/**
 * Function tio detect each scroll event.
 * Call loadIages function to fetch more images
 */
window.addEventListener('scroll',()=>{
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    loadImages();
    }
})