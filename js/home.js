console.clear();
initialize();
setGamesZero();

function initialize() {
  // Check if playStory exists in localStorage
  if (localStorage.getItem('playKendama')){
    localStorage.setItem('playKendama', '0');
     } else {
      // Get the value of playStory from localStorage
    if  (!localStorage.getItem('playKendama')) {
      localStorage.setItem('playKendama', '0');
    }
  }

if (localStorage.getItem('playHikikomori')){
  localStorage.setItem('playHikikomori', '0');
   } else {
    // Get the value of playStory from localStorage
  if  (!localStorage.getItem('playHikikomori')) {
    localStorage.setItem('playHikikomori', '0');
  }
}

if (localStorage.getItem('playTsundoku')){
  localStorage.setItem('playTsundoku', '0');
   } else {
    // Get the value of playStory from localStorage
  if  (!localStorage.getItem('playTsundoku')) {
    localStorage.setItem('playTsundoku', '0');
  }
}

if (localStorage.getItem('playYarikomi')){
  localStorage.setItem('playYarikomi', '0');
   } else {
    // Get the value of playStory from localStorage
  if  (!localStorage.getItem('playYarikomi')) {
    localStorage.setItem('playYarikomi', '0');
  }
}

if (localStorage.getItem('playZappingu')){
  localStorage.setItem('playZappingu', '0');
   } else {
    // Get the value of playStory from localStorage
  if  (!localStorage.getItem('playZappingu')) {
    localStorage.setItem('playZappingu', '0');
  }
}
}

function redirections() {
  // Redirect to the respective page
  if (localStorage.getItem('playKendama') == '1') {
    window.location.href = 'kendama.html';
  } else if (localStorage.getItem('playHikikomori') == '1') {
    window.location.href = 'hikikomori.html';
  } else if (localStorage.getItem('playTsundoku') == '1') {
    window.location.href = 'tsundoku.html';
  } else if (localStorage.getItem('playYarikomi') == '1') {
    window.location.href = 'yarikomi.html';
  } else if (localStorage.getItem('playZappingu') == '1') {
    window.location.href = 'zappingu.html';
  }
}

// Check every 5 seconds
setInterval(redirections, 5000);



function holeGames() {
  let code = localStorage.getItem('randomCode');
  let formData = new FormData();
  formData.append('code', code);

  fetch("https://hikaru.ch/php/holeGames.php",
      {
          body: formData,
          method: "post",
          headers: {
          }
        })
.then((res) => {
    console.log("Games wurden geladen.");
    console.log("Response Headers:", res.headers);
    // localStorage.setItem('playZappingu', '1');


    return res.json();
})
.then((json) => {
    console.log("JSON Data:", json);
    if ( json[0].gzappingu === "1") {
      // localStorage-Eintrag setzen
      localStorage.setItem('playZappingu', '1');
      console.log('localStorage wurde aktualisiert: playZappingu = 1');
  } else if ( json[0].gyarikomi === "1") {
    localStorage.setItem('playYarikomi', '1');;
  }

})
.catch((error) => {
    console.error('Error:', error);
});
}

setInterval(holeGames, 5000);




//MAYBE LATER
// function checkGameZappingu() {
//   const code = localStorage.getItem('randomCode');
//   fetch(`https://hikaru.ch/php/checkPlayStory.php?code=${code}`)
//   .then((res) => res.json())
//   .then((data) => {
//       if (data.playZappingu === '1') {
//           // localStorage.setItem('playStory', '1'); // Set playStory to true vlt spaeter nomal genau luege

//               window.location.href = 'pages/zappingu.html';
//       }
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//   });
// }

// setInterval(checkGameZappingu, 5000);



window.onload = registrieren();


function registrieren() {
  let code = localStorage.getItem('randomCode');
  let gkendama = localStorage.getItem('playKendama');
  let ghikikomori = localStorage.getItem('playHikikomori');
  let gtsundoku = localStorage.getItem('playTsundoku');
  let gyarikomi = localStorage.getItem('playYarikomi');
  let gzappingu = localStorage.getItem('playZappingu');

  console.log(code, gkendama, ghikikomori, gtsundoku, gyarikomi, gzappingu);

  beispielFetchFormulardaten(code, gkendama, ghikikomori, gtsundoku, gyarikomi, gzappingu);
}

function beispielFetchFormulardaten(code, gkendama, ghikikomori, gtsundoku, gyarikomi, gzappingu) {
  let formData = new FormData();
  formData.append('code', code);
  formData.append('gkendama', gkendama);
  formData.append('ghikikomori', ghikikomori);
  formData.append('gtsundoku', gtsundoku);
  formData.append('gyarikomi', gyarikomi);
  formData.append('gzappingu', gzappingu);

  fetch("https://hikaru.ch/php/registriereGames.php", {
      body: formData,
      method: "post",
  })
  .then((res) => {
      return res.text();
  })
  .then((data) => {
      document.querySelector('#server-message').innerHTML = data;
  });
}





function setGamesZero() {

  let code = localStorage.getItem("randomCode");
  
  let formData = new FormData();
  formData.append('code', code);

  fetch("https://hikaru.ch/php/setGamesToZero.php",
      {
          body: formData,
          method: "post",
          headers: {
          }
        })
        .then((res) => {
          localStorage.setItem('playTsundoku', '0');
          localStorage.setItem('playHikikomori', '0');
          localStorage.setItem('playKendama', '0');
          localStorage.setItem('playYarikomi', '0');
          localStorage.setItem('playZappingu', '0');
            // Handle the response if needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}





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

