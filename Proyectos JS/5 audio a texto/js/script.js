/**
 * @fileOverview File to handle audio to text process
 * @author Perez, Alejandro
 * @version 1.0.0
 */

//Create instance of start button and output div of DOM
const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('output');

//Declare instance of Speech and select language
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'es-MX';

/**On start, change button legend */
recognition.onstart = () => {
    startButton.textContent = 'Grabar..';
};

/**After audio finishes, print text on screen */
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("TRAN " + transcript)
    outputDiv.textContent = transcript;
};

/**Change button legend when process ended */
recognition.onend = () => {
    startButton.textContent = 'Iniciar';
};

/**Buttons listener*/
startButton.addEventListener('click', () => {
    recognition.start();
});