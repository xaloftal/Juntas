const GetIdUtente = (nus) => {
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

    const emailMatch = email.match('\@[a-zA-Z]*');

    if (emailMatch) {
        switch (emailMatch[0].toLowerCase()) {
            case '@med': {
                alert("Escreva um email correto.");
                document.querySelector('[data-id="email"]').value = '';
                document.querySelector('[data-id="password"]').value = '';
                break;
            }
            case '@adm': {
                alert("Escreva um email correto.");
                document.querySelector('[data-id="email"]').value = '';
                document.querySelector('[data-id="password"]').value = '';
                break;
            }
            default: {
                break;
            }
        }
    } else {
        alert("Escreva um email correto.");
        document.querySelector('[data-id="email"]').value = '';
        document.querySelector('[data-id="password"]').value = '';
    }

    GetIdUtente(nus)
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

const GetIdMedico = (ced) => {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: "http://localhost:3001/GetId?ced=" + ced,
                type: "GET",
                crossDomain: true,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
            .then((response) => {
                console.log(response[0]);

                if (response.length > 0 && response[0].id_medico !== undefined) {
                    resolve(response[0]);
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

const doRegisterMedico = () => {

    let email = document.querySelector('[data-id="email"]').value;
    let cedula = document.querySelector('[data-id="cedula"]').value;
    let password = document.querySelector('[data-id="password"]').value;

    const emailMatch = email.match('\@[a-zA-Z]*');

    if (emailMatch) {
        switch (emailMatch[0].toLowerCase()) {
            case '@med': {
                break;
            }
            case '@adm': {
                alert("Escreva um email correto.");
                document.querySelector('[data-id="email"]').value = '';
                document.querySelector('[data-id="password"]').value = '';
                break;
            }
            default: {
                alert("Escreva um email correto.");
                document.querySelector('[data-id="email"]').value = '';
                document.querySelector('[data-id="password"]').value = '';
                break;
            }
        }
    } else {
        alert("Escreva um email correto.");
        document.querySelector('[data-id="email"]').value = '';
        document.querySelector('[data-id="password"]').value = '';
    }
    GetIdMedico(cedula)
        .then((medico) => {
            return $.ajax({
                url: "http://localhost:3050/RegistoMedico?id=" + encodeURI(medico.id_medico) + "&ced=" + encodeURI(cedula) + "&nome=" + encodeURI(medico.nome_m) + "&email=" + encodeURI(email) + "&tele=" + encodeURI(medico.tel_m) + "&pass=" + encodeURI(password),
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
            window.location = '/www/AdmContas.html';
        })
        .catch((error) => {
            alert('Erro ao registar');
        });
}