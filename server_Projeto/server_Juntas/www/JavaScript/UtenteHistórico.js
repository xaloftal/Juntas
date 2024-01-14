GetPedidoUtente = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/pedidoUtente?id_utente=" + encodeURI(userSession.id),
                type: "GET",
                crossDomain: true,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                'Access-Control-Allow-OSrigin': '*'
            })
            .then((response) => {
                let containerPedido = document.querySelector('[data-id="pedidoUtenteContainer"]');
                response.forEach(pedido => {
                    const formattedDate = formatDateString(pedido.data_pedido);
                    containerPedido.innerHTML += '<td>' + pedido.nome_m + '<p class="med-email">' + pedido.email_m + '</p></td><td class="right">' + formattedDate + '</td><td class="right">' + pedido.estado_p + '</td><td><a class="see-details" onclick="refPedido(\'' + pedido.id_pedido + '\')">Ver detalhes</a></td>';
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

function formatDateString(dateString) {

    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formattedDate;
}

const refPedido = (id) => {
    window.location.href = '/www/UtenteEstado.html?id_pedido=' + encodeURI(id);
}