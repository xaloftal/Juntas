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
                    containerPedido.innerHTML += '<td>'+ pedido.nome_u +'<p class="med-email">'+ pedido.email_u +'</p></td><td class="right">'+ pedido.data_pedido +'</td><td><a class="see-details">Ver detalhes</a></td>';
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}