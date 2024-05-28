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
    let codeInput = document.getElementById('codeInput').value;
    let message = document.getElementById('message');

    if (codeInput.length === 5) {
        message.textContent = "Code erfolgreich eingereicht!";
        message.style.color = "green";
        console. log ("Hallo " + codeInput);
        
    } else {
        message.textContent = "Bitte geben Sie einen gültigen 5-stelligen Code ein.";
        message.style.color = "red";
    }
});



// function verbinden () {

//     let codeInput = document. querySelector ("#codeInput").value;
//     console. log ("Hallo " + code);
// }


// function beispielFetchFormulardaten() {

//     let formData = new FormData();
//     formData.append('codeInput', codeInput);

//     fetch("meinserver.ch/php/daten.php",
//         {
//             body: formData,
//             method: "post",
//         })

//         .then((res) => {

//             return res.text();

//         })
//         .then((data) => {

//         document.querySelector('#nachricht').innerHTML = data;

//         })

// }