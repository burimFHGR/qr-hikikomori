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
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h1>Bitte besuchen Sie diese Seite auf einem Computer</h1>
                <p>Um fortzufahren, gehen Sie zu <a href="http://qr-hikikomori.ch">qr-hikikomori.ch</a> auf Ihrem Computer.</p>
            </div>
        `;
    }
}

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
        codeElement.textContent = 'Ihr Code: ' + randomCode;
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

function checkPlayStoryStatus() {
    const code = localStorage.getItem('randomCode');
    fetch(`https://hikaru.ch/php/checkPlayStory.php?code=${code}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.playStory === '1') {
            startStory();
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
