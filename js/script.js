function startStory() {
    document.getElementById('status').textContent = 'Status: QR-Code gescannt. Die Story startet jetzt!';
    document.body.style.backgroundColor = 'red';
    localStorage.setItem('playStory', 'true'); // Set playStory to true
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
        localStorage.setItem('playStory', 'false'); // Set default value to false
    }

    // Detect if the user is on a mobile device
    detectMobile();

    // Generate a new random code and save it to localStorage
    const randomCode = generateRandomCode();
    localStorage.setItem('randomCode', randomCode);
    document.getElementById('code').textContent = 'Ihr Code: ' + randomCode;
}

window.onload = initialize;