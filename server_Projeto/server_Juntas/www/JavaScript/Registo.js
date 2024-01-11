const GetId = (nus) => {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: "http://localhost:3000/GetId?nus=" + nus,
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

const doRegisterUtente = () => {
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

const doRegisterMedico = () => {

    let phone = document.querySelector('[data-id="phone"]').value;
    let email = document.querySelector('[data-id="email"]').value;
    let cedula = document.querySelector('[data-id="cedula"]').value;
    let name = document.querySelector('[data-id="name"]').value;
    let password = document.querySelector('[data-id="password"]').value;

    $.ajax({
            url: "http://localhost:3050/RegistoMedico?ced=" + encodeURI(cedula) + "&nome=" + encodeURI(name) + "&email=" + encodeURI(email) + "&tele=" + encodeURI(phone) + "&pass=" + encodeURI(password),
            type: "POST",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {
            window.location = 'AdmContas.html'
        })
        .catch((error) => {
            alert('Erro ao registar')
        });

}