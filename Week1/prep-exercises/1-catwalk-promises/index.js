'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
const WALKING_CAT_URL = "http://www.anniemation.com/clip_art/images/cat-walk.gif";


function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let interval;

   let catPos = startPos ;
  interval  = setInterval(()=>{
    catPos += STEP_SIZE_PX;
    img.style.left =catPos + 'px';
    if(catPos >= stopPos){
  
      clearInterval(interval);
      resolve(catPos);
      
    }

  },STEP_INTERVAL_MS);
  
    // setInterval(walk(img, startPos, stopPos),STEP_INTERVAL_MS);

    // Resolve this promise when the cat (`img`) has walked from `startPos` to
    // `stopPos`.
    // Make good use of the `STEP_INTERVAL_PX` and `STEP_INTERVAL_MS`
    // constants.
  });
}

function dance(img) {
  return new Promise((resolve) => {
    img.src = DANCING_CAT_URL;
    setTimeout(()=>{
      img.src = WALKING_CAT_URL;
      resolve();
    }, DANCE_TIME_MS );
      
    // Switch the `.src` of the `img` from the walking cat to the dancing cat
    // and, after a timeout, reset the `img` back to the walking cat. Then
    // resolve the promise.
    // Make good use of the `DANCING_CAT_URL` and `DANCE_TIME_MS` constants.
  });
}



function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;
  img.style.left = startPos +'px';



walk(img,startPos,centerPos).then((result) => {
  dance(img).then(()=> {
    walk(img,result,stopPos).then(()=>  {
      catWalk();
      } );
  });
 }

)
  

  // Use the `walk()` and `dance()` functions to let the cat do the following:
  // 1. Walk from `startPos` to `centerPos`.
  // 2. Then dance for 5 secs.
  // 3. Then walk from `centerPos` to `stopPos`.
  // 4. Repeat the first three steps indefinitely.
  
  
  
}

window.addEventListener('load', catWalk);