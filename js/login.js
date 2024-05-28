console.log("Hallo ");

// document.getElementById('codeForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     let codeInput = document.getElementById('codeInput').value;
//     let message = document.getElementById('message');

//     if (codeInput.length === 5) {
//         // AJAX-Request an das PHP-Skript senden
//         fetch('https://372401-15.web.fhgr.ch/php/holeCode.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `code=${encodeURIComponent(codeInput)}`
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 message.textContent = data.message;
//                 message.style.color = "green";
//                 console.log("Hallo " + data.user);
//             } else {
//                 message.textContent = data.message;
//                 message.style.color = "red";
//             }
//         })
//         .catch(error => {
//             message.textContent = "Ein Fehler ist aufgetreten.";
//             message.style.color = "red";
//             console.error('Error:', error);$
//         });
//     } else {
//         message.textContent = "Bitte geben Sie einen gültigen 5-stelligen Code ein.";
//         message.style.color = "red";
//     }
// });



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