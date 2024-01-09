doRegister = () => {
    let email = document.querySelector('[data-id="email"]').value;
    let password = document.querySelector('[data-id="password"]').value;
    let nus = document.querySelector('[data-id="nus"]').value;

    $.ajax({
        url: "http://localhost:3050/RegistoUtente? + "&email=" + encodeURI(email) + "&password=" + encodeURI(password) + "&nus=" + nus,
        type: "POST",
        crossDomain: false,
        dataType: "json",
        headers: { 
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        },
        'Access-Control-Allow-OSrigin': '*'
    })
    .then((response) => {
        window.location = '../Login.html'
    })
    .catch((error) => {
        alert('Erro ao registar')
    });

}