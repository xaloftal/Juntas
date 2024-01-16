doLogin = async () => {
    let email = document.querySelector('[data-id="email"]').value;
    let password = document.querySelector('[data-id="password"]').value;

    try {
        const response = await $.ajax({
            url: "http://localhost:3050/login?email=" + encodeURI(email) + "&password=" + encodeURI(password),
            type: "GET",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-Origin': '*'
        });

        if (response.length > 0 && response[0].estado_l !== 'Inativo') {
            console.log(response[0]);

            const emailMatch = email.match('@[a-zA-Z]*');
            localStorage.setItem("userSession", JSON.stringify(response[0]));

            if (emailMatch) {
                switch (emailMatch[0].toLowerCase()) {
                    case '@med':
                        $(location).prop('href', '/www/MedicoPedidos.html');
                        break;
                    case '@adm':
                        $(location).prop('href', '/www/AdmPedidos.html');
                        break;
                    default:
                        const pedido = await getEstadoPedido(email);
                        if (pedido) {
                            $(location).prop('href', '/www/UtenteHistorico.html');
                        } else {
                            $(location).prop('href', '/www/UtenteSolicitacao.html');
                        }
                        break;
                }
            }
        } else {
            alert("Login Incorreto ou Inativo!");
            document.querySelector('[data-id="email"]').value = '';
            document.querySelector('[data-id="password"]').value = '';
        }
    } catch (error) {
        console.error(error);
    }
}

const getEstadoPedido = async (email) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:3050/pedidoEstadoUtente?email=" + encodeURI(email),
            type: "GET",
            crossDomain: true,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        });

        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}