const landing = document.querySelector('.landing');
const computed = window.getComputedStyle(landing);
console.log(computed.background);
if (!landing) {
  console.error('Landing not found.');
}

let sw = window.innerWidth;
let sh = window.innerHeight;
window.addEventListener('resize', () => {
  sw = window.innerWidth;
  sh = window.innerHeight;
  console.log(sw);
  recenter();
});

console.log(sw);

function Blob(xcenter, ycenter, color, transparent, xsize, ysize, extra = {}) {
  this.xcenter = xcenter;
  this.ycenter = ycenter;
  this.color = color;
  this.transparent = transparent;
  this.xsize = xsize;
  this.ysize = ysize;

  this.friction = extra.friction || 0.01;
  this.acceleration = extra.acceleration || 4;
  this.xbound = extra.xbound || 100;
  this.ybound = extra.ybound || 100;

  this.x = 0;
  this.y = 0;
  this.xv = 0;
  this.yv = 0;
}


let t = 0;
let dt = 0;
const rate = 60;
const throttleMs = 50;

let lastUpdate = performance.now();
let lastRender = performance.now();

const blobs = [
  cyan = new Blob(110, 250, "rgba(0, 177, 170, 0.3) 0%, rgba(0, 177, 170, 0.18) 50%", "transparent 80%" , 700, 760, {acceleration: 12}),
  green = new Blob(890, 400, "rgba(130, 135, 140, 0.3) 0%, rgba(130, 130,130, 0.18) 50%", "transparent 75%" , 700, 700),
  purple = new Blob(460, 800, "rgba(136, 81, 176, 0.2) 0%, rgba(116, 81, 181, 0.12) 55%", "transparent 75%" , 600, 700, {acceleration: 6, friction: 0.05, xbound: 150, ybound:150}),
];

recenter();

function update(now) {
  const dsec = (now - lastRender) / 1000;
  lastRender = now;
  if (dsec < 0.1) {
    dt = rate * dsec;
  } else {
    dt = 0;
  }

  t += dt;


  if (now - lastUpdate >= throttleMs) {
    lastUpdate = now - ((now - lastUpdate) % throttleMs);

    blobs.forEach(function(blob) {
      blob.xv = blob.xv * (1 - Math.abs(blob.xv) * dt * blob.friction) + blob.acceleration * dt * (Math.random()-0.5);
      blob.yv = blob.yv * (1 - Math.abs(blob.yv) * dt * blob.friction) + blob.acceleration * dt * (Math.random()-0.5);

      //console.log("(x,xbound,y,ybound) = (" + blob.x + "," + blob.xbound+"," + blob.y + "," + blob.ybound + ")");

      blob.x += blob.xv * dt;
      blob.y += blob.yv * dt;

      if (blob.x > blob.xbound){
        blob.xv -= 1;
      }
      if (blob.x < -blob.xbound){
        blob.xv += 1;
      }
      if (blob.y > blob.ybound){
        blob.yv -= 1;
      }
      if (blob.y < -blob.ybound){
        blob.yv += 1;
      }


    });



    if (sw > 1280) {//THINK ABOUT THIS VALUE
      const blobbackground = blobs.map(blob =>
        `radial-gradient(
           ellipse ${blob.xsize}px ${blob.ysize}px
           at ${blob.x + blob.xcenter}px ${blob.y + blob.ycenter}px,
           ${blob.color},
           ${blob.transparent}
         )`
      ).join(', ');
      //console.log(blobbackground);
      landing.style.background = blobbackground;
      //console.log("landing.style.background = " + landing.style.background);

    } else if (sw > 720){
      let mwh = sw;

      const blobbackground = blobs.map(blob =>
        `radial-gradient(
           ellipse ${mwh / 1280 * (blob.xsize)}px ${mwh / 1280 * (blob.ysize)}px
           at ${mwh / 1280 * (blob.x + blob.xcenter)}px ${mwh / 1280 * (blob.y + blob.ycenter)}px,
           ${blob.color},
           ${blob.transparent}
         )`
      ).join(', ');
      //console.log(blobbackground);
      landing.style.background = blobbackground;
      //console.log("landing.style.background = " + landing.style.background);
    } else {

      let mwh = Math.floor(Math.min(sw, 0.58*sh));

      const blobbackground = blobs.map(blob =>
        `radial-gradient(
           ellipse ${mwh / 1000 * (blob.xsize)}px ${mwh / 1000 * (blob.ysize)}px
           at ${mwh / 1000 * (blob.x + blob.xcenter)}px ${mwh / 1000 * (blob.y + blob.ycenter)}px,
           ${blob.color},
           ${blob.transparent}
         )`
      ).join(', ');
      //console.log(blobbackground);
      landing.style.background = blobbackground;
      //console.log("landing.style.background = " + landing.style.background);
    }

  }


  requestAnimationFrame(update);

}

requestAnimationFrame(update);

function recenter(){
  if (sw > 720) {
    blobs[0].xcenter = 110;
    blobs[1].xcenter = 890;
    blobs[2].xcenter = 460;

    blobs[0].ycenter = Math.floor(0.5 * sh - 441);
    blobs[1].ycenter = Math.floor(0.5 * sh - 320);
    blobs[2].ycenter = Math.floor(0.55 * sh + 8);

    blobs[0].xsize = 740; blobs[0].ysize = 700;
    blobs[1].xsize = 700; blobs[1].ysize = 700;
    blobs[2].xsize = 500; blobs[2].ysize = 500;
  } else {
    blobs[0].xcenter = -10;
    blobs[1].xcenter = 950;
    blobs[2].xcenter = 400;

    blobs[0].ycenter = 350;
    blobs[1].ycenter = 600;
    blobs[2].ycenter = 1200;

    blobs[0].xsize = 900; blobs[0].ysize = 900;
    blobs[1].xsize = 850; blobs[1].ysize = 880;
    blobs[2].xsize = 620; blobs[2].ysize = 620;
  }
}


document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(update);
  else requestAnimationFrame(update);
});
