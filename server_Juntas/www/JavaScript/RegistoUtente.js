const GetId = (nus) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3050/GetId?nus=" + nus,
            type: "GET",
            crossDomain: true,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((response) => {
            console.log(response);

            if (response.length > 0 && response[0].id_utente !== undefined) {
                resolve(response[0].id_utente);
            } else {
                reject("id_utente não válido");
            }
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}

const doRegister = () => {
    let email = document.querySelector('[data-id="email"]').value;
    let password = document.querySelector('[data-id="password"]').value;
    let nus = document.querySelector('[data-id="nus"]').value;

    GetId(nus)
        .then((id) => {
            return $.ajax({
                url: "http://localhost:3050/RegistoUtente?id=" + encodeURI(id) + "&email=" + encodeURI(email) + "&password=" + encodeURI(password) + "&nus=" + nus,
                type: "POST",
                crossDomain: true,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            });
        })
        .then((response) => {
            window.location = '/www/Login.html';
        })
        .catch((error) => {
            alert('Erro ao registar');
        });
}