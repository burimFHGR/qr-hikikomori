console.log("Hallo");

function login(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    let code = document.getElementById('codeInput').value;

    console.log(code);

    let formData = new FormData();
    formData.append('code', code);

    fetch("https://372401-15.web.fhgr.ch/php/login.php", {
        body: formData,
        method: "post",
    })
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        document.querySelector('#nachricht').innerHTML = data;
    });
}
