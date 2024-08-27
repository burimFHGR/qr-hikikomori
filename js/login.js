console.log("Hallo");

document.getElementById("codeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Standard-Formularverhalten

    // Wert des Eingabefeldes abrufen
    var code = document.getElementById("codeInput").value;

    // Wert im Local Storage speichern
    localStorage.setItem("randomCode", code);

    // Optional: Nachricht anzeigen
    document.getElementById("nachricht").innerHTML = "Code wurde gespeichert!";
});

function login(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    let code = document.getElementById('codeInput').value;

    console.log(code);

    let formData = new FormData();
    formData.append('code', code);

    fetch("https://hikaru.ch/php/login.php", {
        body: formData,
        method: "post",
    })
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        document.querySelector('#nachricht').innerHTML = data;

        if (data.includes("Verbindung war erfolgreich.")) {
            setTimeout(() => {
                window.location.href = "anleitung.html";
            }, 1500); // 15 Sekunden Verzögerung
        }
    });
}


