const GetPrimeiroPedido = () => {
    $.ajax({
            url: "http://localhost:3050/pedidoAdmPrimeiro",
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
            let containerPedido = document.querySelector('[data-id="primeiroPedidoContainer"]');
            response.forEach(pedido => {
                console.log(pedido);
                containerPedido.innerHTML += '<td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + pedido.data_pedido + '</td><td><button class="evaluate-btn" onclick=(\''+ pedido.id_pedido +'\')>Avaliar</button></td>';
            })

        })
        .catch((error) => {
            console.error(error)
        });
}

const GetPedidos = () => {
    $.ajax({
            url: "http://localhost:3050/pedidoAdm",
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
            let containerPedido = document.querySelector('[data-id="pedidoContainer"]');
            response.forEach(pedido => {
                console.log(pedido);
                containerPedido.innerHTML += '<td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + pedido.data_pedido + '</td>';
            })

        })
        .catch((error) => {
            console.error(error)
        });
}

const GetPedido = (id) => {
    window.location.href = '/www/AdmAvaliacao.html?id_=' + encodeURI(id);
}