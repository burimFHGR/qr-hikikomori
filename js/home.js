console.clear();
const svg = document.querySelector("#demo");
const tl = gsap.timeline({onUpdate:onUpdate});
let pt = svg.createSVGPoint();
let data = document.querySelector(".tlProgress");
let counter = document.querySelector("#counter");
const ratio = 0.5625;

gsap.set("#instructions, #dial", {xPercent: -50});
gsap.set("#progressRing", {drawSVG:0});

tl.to("#masker", {duration: 2, attr:{r:2400}, ease:"power2.in"});
tl.reversed(true);

function mouseHandler() {
  tl.reversed(!tl.reversed());
}

function getPoint(evt){
  pt.x = evt.clientX; 
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function mouseMove(evt) {
  let newPoint = getPoint(evt);
  gsap.set("#dot", {attr:{cx:newPoint.x, cy:newPoint.y}});
  gsap.to("#ring, #masker", 0.88, {attr:{cx:newPoint.x, cy:newPoint.y}, ease:"power2.out"});
 }

function onUpdate() {
  let prog = (tl.progress() * 100);
  gsap.set("#progressRing", {drawSVG:prog + "%"});
  counter.textContent = prog.toFixed();
}

function newSize() {
  let w = window.innerWidth ;
  let h = window.innerHeight;
  if (w > h * (16/9) ) {
    gsap.set("#demo", { attr: { width: w, height: w * ratio } });
  } else {
    gsap.set("#demo", { attr: { width: h / ratio, height: h } });
  }
  let data = svg.getBoundingClientRect();
  gsap.set("#demo", {x:w/2 - data.width/2});
  gsap.set("#demo", {y:h/2 - data.height/2});
}

window.addEventListener("mousedown", mouseHandler);
window.addEventListener("mouseup", mouseHandler);
window.addEventListener("mousemove", mouseMove);

newSize();
window.addEventListener("resize", newSize);


function showPopup(imageSrc) {
  // Setze das Bild im Popup
  document.getElementById('popupImage').src = imageSrc;

  // Zeige das Popup an
  document.getElementById('popup').style.display = 'block';
  document.getElementById('popupOverlay').style.display = 'block';

  // Animieren des Popups (z.B. mit GSAP)
  gsap.fromTo("#popup", { opacity: 0 }, { opacity: 1, duration: 0.5 });
}

// Event-Listener, um das Popup zu schließen, wenn man auf das Overlay klickt
document.getElementById('popupOverlay').addEventListener('click', function() {
  gsap.to("#popup", { opacity: 0, duration: 0.5, onComplete: function() {
      document.getElementById('popup').style.display = 'none';
      document.getElementById('popupOverlay').style.display = 'none';
  }});
});

