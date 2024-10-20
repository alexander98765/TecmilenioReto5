/**
 * @fileOverview File to handle process of downcounter
 * @author Perez, Alejandro
 * @version 1.0.0
 */

/**Class to handle canvas snowflake efect on screen */
class Snowflake {

    /**
     * constructor to set default class values
    */
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.radius = 0;
      this.alpha = 0;
  
      this.reset();
    }
    
    /**
     * Function to reset values to default
     */
    reset() {
      this.x = this.randBetween(0, window.innerWidth);
      this.y = this.randBetween(0, -window.innerHeight);
      this.vx = this.randBetween(-3, 3);
      this.vy = this.randBetween(2, 5);
      this.radius = this.randBetween(1, 4);
      this.alpha = this.randBetween(0.1, 0.9);
    }
  
    /**
     * Generates a random number betweena a range
     * @param {int} min Min value in range 
     * @param {int} max Max value in range
     * @returns {int} random number that was generated
     */
    randBetween(min, max) {
      return min + Math.random() * (max - min);
    }
  
    /**
     * Function to update 
     */
    update() {
      this.x += this.vx;
      this.y += this.vy;
  
      if (this.y + this.radius > window.innerHeight) {
        this.reset();
      }
    }
}

/**Class to handle canvas snow efect on screen */
class Snow {

  /**
     * constructor to set default class values
  */
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    window.addEventListener("resize", () => this.onResize());
    this.onResize();
    this.updateBound = this.update.bind(this);
    requestAnimationFrame(this.updateBound);

    this.createSnowflakes();
  }

  /**
   * Function to change values whrn screen was resized
   */
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * Function to create a snowflake
   */
  createSnowflakes() {
    const flakes = window.innerWidth / 4;

    this.snowflakes = [];

    for (let s = 0; s < flakes; s++) {
      this.snowflakes.push(new Snowflake());
    }
  }

  /**
   * Function to update values 
   */
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let flake of this.snowflakes) {
      flake.update();

      this.ctx.save();
      this.ctx.fillStyle = "#FFF";
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.globalAlpha = flake.alpha;
      this.ctx.fill();
      this.ctx.restore();
    }
    requestAnimationFrame(this.updateBound);
  }
}
  
/**
 * New instance to start snowing
 */
new Snow();


var fechaano = new Date();
var anofecha = fechaano.getFullYear();
const comingyear = anofecha + 1;

//Declare new year date
const comingdate = new Date("Jan 1, "+ comingyear +" 00:00:00");

const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

/**Calculate days, hours, minutes and seconds until new year */
let countdown = setInterval(() => {
  const now   = new Date();
  const des   = comingdate.getTime() - now.getTime();
  const days  = Math.floor(des / (1000 * 60 * 60 * 24));
  const hours = Math.floor((des % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((des % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((des % (1000 * 60)) / 1000);

  d.innerHTML = getTrueNumber(days);
  h.innerHTML = getTrueNumber(hours);
  m.innerHTML = getTrueNumber(mins);
  s.innerHTML = getTrueNumber(secs);

  if (countdown <= 0) clearInterval(countdown);
}, 1000);
  
const getTrueNumber = x => (x < 10 ? "0" + x : x);