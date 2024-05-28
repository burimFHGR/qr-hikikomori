document.addEventListener('DOMContentLoaded', function() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const mobileView = document.getElementById('mobileView');
    const desktopView = document.getElementById('desktopView');

    if (!isMobile) {
        mobileView.style.display = 'none';
        desktopView.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'https://372401-15.web.fhgr.ch/index.html'; // Hier die URL zur Hauptseite einfügen
        }, 5000);
    }
});

document.getElementById('codeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const codeInput = document.getElementById('codeInput').value;
    const message = document.getElementById('message');

    if (codeInput.length === 5) {
        message.textContent = "Code erfolgreich eingereicht!";
        message.style.color = "green";
    } else {
        message.textContent = "Bitte geben Sie einen 5-stelligen Code ein.";
        message.style.color = "red";
    }
});
