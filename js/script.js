function startStory() {
    document.getElementById('status').textContent = 'Status: QR-Code gescannt. Die Story startet jetzt!';
    document.body.style.backgroundColor = 'lightgreen';

    var vidTicken = document.getElementById('vidTicken');
    var vidKaputt = document.getElementById('vidKaputt');
    

    // Ändern der Display-Eigenschaften
    vidTicken.style.display = 'none';
    vidKaputt.style.display = 'block';

    if (vidKaputt.style.display === 'block') {
        setTimeout(() => {
            document.querySelector('.menu').style.display = 'flex';
        }, 5000);
    }
}


function detectMobile() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        document.body.style.margin = "10vh";
        document.body.style.padding = "0";
        document.body.style.height = "100vh";
        document.body.style.display = "flex";
        document.body.innerHTML = `

            <div style="text-align: center; margin-top: 50px; background-color: black; color: white;">
                <h1>Bitte besuche diese Seite auf einem Computer</h1> <br><br><br><br><br><br><br><br><br><br>
                <h1>hikaru.ch</h1>
            </div>
        `;
    }
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");


circles.forEach(function (circle) {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    if (index === 0) {
      // Specific handling for the outer circle
      circle.style.left = x - 15 + "px"; // Adjusted for border
      circle.style.top = y - 15 + "px";  // Adjusted for border
    } else {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
    }
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();


function generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

function initialize() {
    // Check if playStory exists in localStorage
    if (!localStorage.getItem('playStory')) {
        localStorage.setItem('playStory', '0'); // Set default value to false
    }

    // Detect if the user is on a mobile device
    detectMobile();

    // Generate a new random code and save it to localStorage
    const randomCode = generateRandomCode();
    localStorage.setItem('randomCode', randomCode);
    const codeElement = document.getElementById('code');
    if (codeElement) {
        codeElement.textContent = '' + randomCode;
    }

    setInterval(checkPlayStoryStatus, 5000);
}

$(function() {
    $(".menu-link").click(function(e) {
        e.preventDefault();
        $(".menu-overlay").toggleClass("open");
        $(".menu").toggleClass("open");
    });
});

let videoPlayed = false;

function muteAllMedia() {
    // Mute alle Audio-Elemente
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.muted = true;
    });
}

function checkPlayStoryStatus() {
    const code = localStorage.getItem('randomCode');
    fetch(`https://hikaru.ch/php/checkPlayStory.php?code=${code}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.playStory === '1' && !videoPlayed) {
            videoPlayed = true;

            muteAllMedia();

            const breakVideo = document.createElement('video');
            breakVideo.src = '/vids/break.mp4';
            breakVideo.autoplay = true;
            breakVideo.onended = () => {
                window.location.href = 'pages/home.html';
            };
            document.body.appendChild(breakVideo);
            breakVideo.play();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function toggleMute() {
    var muted = document.getElementById('muted');
    var unmuted = document.getElementById('unmuted');
    var audio = document.getElementById('autoPlayAudio');


    if (muted.style.display === 'none') {
        muted.style.display = 'block';
        unmuted.style.display = 'none';
        audio.pause();
    } else {
        muted.style.display = 'none';
        unmuted.style.display = 'block';
        audio.play();
    }
}

function generateRandomHash(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

document.querySelectorAll('td[id]').forEach(element => {
    const originalText = element.textContent;
    element.setAttribute('data-original', originalText);
    let hash = '<b>???</b> ';
    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        if (char === ' ' || char === '🔍' || char === '🔒') {
            hash += char;
        } else {
            hash += generateRandomHash(1);
        }
    }
    element.innerHTML = hash;
    element.addEventListener('click', () => {
        element.textContent = element.getAttribute('data-original');
    });
});

document.getElementById('img1').addEventListener('mouseover', function() {
    const tsundokuBuecher = document.getElementById('hikikomori');
    tsundokuBuecher.style.fontWeight = 'bold';
    tsundokuBuecher.style.paddingLeft = '20px';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});
document.getElementById('img1').addEventListener('mouseout', function() {
    const tsundokuBuecher = document.getElementById('hikikomori');
    tsundokuBuecher.style.fontWeight = 'normal';
    tsundokuBuecher.style.paddingLeft = '0';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});

document.getElementById('img2').addEventListener('mouseover', function() {
    const tsundokuBuecher = document.getElementById('tsundoku-buecher');
    tsundokuBuecher.style.fontWeight = 'bold';
    tsundokuBuecher.style.paddingLeft = '20px';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});
document.getElementById('img2').addEventListener('mouseout', function() {
    const tsundokuBuecher = document.getElementById('tsundoku-buecher');
    tsundokuBuecher.style.fontWeight = 'normal';
    tsundokuBuecher.style.paddingLeft = '0';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});

document.getElementById('img3').addEventListener('mouseover', function() {
    const tsundokuBuecher = document.getElementById('komorebi-licht');
    tsundokuBuecher.style.fontWeight = 'bold';
    tsundokuBuecher.style.paddingLeft = '20px';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});
document.getElementById('img3').addEventListener('mouseout', function() {
    const tsundokuBuecher = document.getElementById('komorebi-licht');
    tsundokuBuecher.style.fontWeight = 'normal';
    tsundokuBuecher.style.paddingLeft = '0';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});

document.getElementById('img4').addEventListener('mouseover', function() {
    const tsundokuBuecher = document.getElementById('dakimakura-kissen');
    tsundokuBuecher.style.fontWeight = 'bold';
    tsundokuBuecher.style.paddingLeft = '20px';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});
document.getElementById('img4').addEventListener('mouseout', function() {
    const tsundokuBuecher = document.getElementById('dakimakura-kissen');
    tsundokuBuecher.style.fontWeight = 'normal';
    tsundokuBuecher.style.paddingLeft = '0';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});

document.getElementById('img5').addEventListener('mouseover', function() {
    const tsundokuBuecher = document.getElementById('maneki-neko');
    tsundokuBuecher.style.fontWeight = 'bold';
    tsundokuBuecher.style.paddingLeft = '20px';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});
document.getElementById('img5').addEventListener('mouseout', function() {
    const tsundokuBuecher = document.getElementById('maneki-neko');
    tsundokuBuecher.style.fontWeight = 'normal';
    tsundokuBuecher.style.paddingLeft = '0';
    tsundokuBuecher.style.transition = 'transform 0.5s, padding-left 0.5s';
});

var lockedImg = document.getElementById('img2');
var unlockedImg = document.getElementById('img2-show');

// Add click event listener to the locked image
lockedImg.addEventListener('click', function() {
    // Toggle visibility between the locked and unlocked images
    if (lockedImg.style.visibility !== 'hidden') {
        lockedImg.style.visibility = 'hidden';
        unlockedImg.style.visibility = 'visible';
    } else {
        lockedImg.style.visibility = 'visible';
        unlockedImg.style.visibility = 'hidden';
    }
});

function revealTsundoku() {
    const tsundokuCell = document.getElementById('tsundoku-buecher');
    tsundokuCell.textContent = tsundokuCell.getAttribute('data-original');
}


document.getElementById('img2').addEventListener('click', function() {
    revealTsundoku();
});

$('#img2-show').click(function(){
    $('body').addClass('modal-active');
    $('#modal-container').show().addClass('active');
    $('.overlay').show().addClass('active');
    $('.overlay-info').addClass('hidden');
    $('.menu-link').addClass('hidden');
});

$('.overlay').click(function(){
    $('#modal-container').removeClass('active').on('transitionend', function() {
        $(this).hide();
    });
    $('.overlay').removeClass('active').on('transitionend', function() {
        $(this).hide();
    });
    $('body').removeClass('modal-active');
    $('.overlay-info').removeClass('hidden');
    $('.menu-link').removeClass('hidden');
});

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $('#modal-container').removeClass('active').on('transitionend', function() {
            $(this).hide();
        });
        $('.overlay').removeClass('active').on('transitionend', function() {
            $(this).hide();
        });
        $('body').removeClass('modal-active');
        $('.overlay-info').removeClass('hidden');
        $('.menu-link').removeClass('hidden');
    }
});




window.onload = function() {
    initialize();
    registrieren();
    loescheCodes();
    document.getElementById('muted').addEventListener('click', toggleMute);
    document.getElementById('unmuted').addEventListener('click', toggleMute);
}

function registrieren() {
    let code = localStorage.getItem('randomCode');
    let playstory = localStorage.getItem('playStory');
    let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(code, playstory, timestamp);

    beispielFetchFormulardaten(code, playstory, timestamp);
}

function beispielFetchFormulardaten(code, playstory, timestamp) {
    let formData = new FormData();
    formData.append('code', code);
    formData.append('playstory', playstory);
    formData.append('timestamp', timestamp);

    fetch("https://hikaru.ch/php/registrieren.php", {
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

function loescheCodes() {
    fetch("https://hikaru.ch/php/loeschCode.php")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.message);
    });
}

window.onload = function() {
    initialize();
    registrieren();
    loescheCodes();
    document.getElementById('muted').addEventListener('click', toggleMute);
    document.getElementById('unmuted').addEventListener('click', toggleMute);

    // Preloader ausblenden
    document.getElementById('preloader').style.display = 'none';
}

function createHighlightInstruction() {
    // Erstelle das Overlay-Element
    const overlay = document.createElement('div');
    overlay.id = 'highlight-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.color = 'white';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9998';
    overlay.style.textAlign = 'left';
    overlay.style.padding = '20px';
    overlay.style.fontWeight = '800';
    overlay.style.fontSize = '2.2vw';
    overlay.innerHTML = `
        <div>
            <button id="confirm-button" style="position:fixed; top: 79.5%; left: 60%; padding: 1% 3%; font-weight:bold; font-size: 1.2vw; cursor: pointer; background: #f3f3f3; border-radius: 11px; box-shadow: 0 3px #444444; color: #000000; display: inline-block; text-align: center;">
                Alles klar
            </button>        
        </div>
    `;

    const textInstruction = document.createElement('div');
    textInstruction.style.position = 'fixed';
    textInstruction.style.top = '82%'; // Positionierung anpassen
    textInstruction.style.left = '25%'; // Positionierung anpassen
    textInstruction.style.transform = 'translate(-50%, -50%)';
    textInstruction.style.color = 'white';
    textInstruction.style.fontSize = '1.8vw';
    textInstruction.style.fontWeight = 'bold';
    textInstruction.style.zIndex = '10000';
    textInstruction.innerText = '1) Scanne den QR-Code';


    const textInstruction2 = document.createElement('div');
    textInstruction2.style.position = 'fixed';
    textInstruction2.style.top = '55%'; // Positionierung anpassen
    textInstruction2.style.left = '67%'; // Positionierung anpassen
    textInstruction2.style.transform = 'translate(-50%, -50%)';
    textInstruction2.style.color = 'white';
    textInstruction2.style.fontSize = '1.8vw';
    textInstruction2.style.fontWeight = 'bold';
    textInstruction2.style.zIndex = '10000';
    textInstruction2.innerHTML = '2) Gib den Code <br> auf deinem Handy ein'; 



    const highlight = document.createElement('div');
    highlight.style.position = 'fixed'; // Element fest positionieren
    highlight.style.width = '200px'; // Größe des hervorgehobenen Bereichs anpassen
    highlight.style.height = '200px'; // Größe des hervorgehobenen Bereichs anpassen
    highlight.style.border = '4px solid red'; // Umrandung für den hervorgehobenen Bereich
    highlight.style.transform = 'translate(-50%, -50%)';
    highlight.style.borderRadius = '10px';
    highlight.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
    highlight.style.top = '56.4%'; // Positionierung anpassen
    highlight.style.left = '43%'; // Positionierung anpassen
    highlight.style.pointerEvents = 'none';



    const highlight2 = document.createElement('div');
    highlight2.style.position = 'fixed'; // Element fest positionieren
    highlight2.style.width = '120px'; // Größe des hervorgehobenen Bereichs anpassen
    highlight2.style.height = '50px'; // Größe des hervorgehobenen Bereichs anpassen
    highlight2.style.border = '4px solid white'; // Umrandung für den hervorgehobenen Bereich
    highlight2.style.transform = 'translate(-50%, -50%)';
    highlight2.style.borderRadius = '10px';
    highlight2.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
    highlight2.style.top = '58.4%'; // Positionierung anpassen
    highlight2.style.left = '52%'; // Positionierung anpassen
    highlight2.style.pointerEvents = 'none';

    const arrow = document.createElement('div');
    highlight.style.position = 'fixed'; // Element fest positionieren
    highlight.style.width = '12%'; // Größe des hervorgehobenen Bereichs anpassen
    highlight.style.height = '20%'; // Größe des hervorgehobenen Bereichs anpassen
    highlight.style.border = '4px solid white'; // Umrandung für den hervorgehobenen Bereich
    highlight.style.transform = 'translate(-50%, -50%) scale(1)'; // Skalierung auf 1, um die Größe beizubehalten
    highlight.style.borderRadius = '10px';
    highlight.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
    highlight.style.top = '76%'; // Positionierung anpassen
    highlight.style.left = '46%'; // Positionierung anpassen
    highlight.style.pointerEvents = 'none';
    highlight.style.transformOrigin = 'center'; // Skalierungsursprung in der Mitte des Elements
    highlight.style.zIndex = '9999';

    
    const arrow2 = document.createElement('div');
    highlight2.style.position = 'fixed'; // Element fest positionieren
    highlight2.style.width = '8%'; // Größe des hervorgehobenen Bereichs anpassen
    highlight2.style.height = '6%'; // Größe des hervorgehobenen Bereichs anpassen
    highlight2.style.border = '4px solid white'; // Umrandung für den hervorgehobenen Bereich
    highlight2.style.transform = 'translate(-50%, -50%) scale(1)'; // Skalierung auf 1, um die Größe beizubehalten
    highlight2.style.borderRadius = '10px';
    highlight2.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
    highlight2.style.top = '58.4%%'; // Positionierung anpassen
    highlight2.style.left = '52%'; // Positionierung anpassen
    highlight2.style.pointerEvents = 'none';
    highlight2.style.transformOrigin = 'center'; // Skalierungsursprung in der Mitte des Elements
    highlight2.style.zIndex = '9999';
    
    // Füge das Overlay zur Seite hinzu
    document.body.appendChild(overlay);
    document.body.appendChild(highlight);
    document.body.appendChild(highlight2);
    document.body.appendChild(arrow);
    document.body.appendChild(arrow2);  
    document.body.appendChild(textInstruction);
    document.body.appendChild(textInstruction2);
    
    // Füge Event-Listener zum Bestätigen-Button hinzu
    document.getElementById('confirm-button').addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.removeChild(highlight);
        document.body.removeChild(highlight2);
        document.body.removeChild(arrow);  
        document.body.removeChild(arrow2);
        document.body.removeChild(textInstruction);
        document.body.removeChild(textInstruction2);
    });
}

// Rufe die Funktion zum Erstellen der Highlight-Anweisung auf
createHighlightInstruction();