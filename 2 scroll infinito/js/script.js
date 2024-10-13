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
function loadImages(numImages = 10){
    let i=0;
    while(i < numImages){
        fetch('https://api.thecatapi.com/v1/images/search?limit=1')
        .then(response=>response.json())
        .then(data=>{
            const img =  document.createElement('img');
            img.src = `${data[0].url}`
            img.width = "550"
            img.height = "500"
            container.appendChild(img)
        })
        i++;
    }  
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
