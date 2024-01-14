const GetPrimeiroPedidoAdm = () => {
    if (localStorage.getItem('userSession')) {
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
                    containerPedido.innerHTML += '<td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + pedido.data_pedido + '</td><td><button class="evaluate-btn" onclick=refPedido(\'' + pedido.id_pedido + '\')>Avaliar</button></td>';
                })

            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const GetPrimeiroPedidoMed = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3050/pedidoMedPrimeiro?id_medico=" + encodeURI(userSession.id),
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
                    containerPedido.innerHTML += '<td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + pedido.data_pedido + '</td><td><button class="answer-btn" onclick=refPedidoMed(\'' + pedido.id_pedido + '\')>Responder</button></td>';
                })

            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const GetPedidosAdm = () => {
    if (localStorage.getItem('userSession')) {
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
    } else {
        alert('No login');
    }
}

const GetPedidosMed = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));
        $.ajax({
                url: "http://localhost:3050/pedidoMed?id_medico=" + encodeURI(userSession.id),
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
    } else {
        alert('No login');
    }
}

const refPedido = (id) => {
    window.location.href = '/www/AdmAvaliacao.html?id_pedido=' + encodeURI(id);
}

const refPedidoMed = (id) => {
    window.location.href = '/www/MedicoAvaliacao.html?id_pedido=' + encodeURI(id);
}

GetUmPedido = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/pedido?id=" + encodeURI(id),
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
                    console.log(containerPedido.innerHTML);
                    containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span">' + pedido.data_pedido + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + pedido.cc_val + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + pedido.dat_nasc + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p style="padding-left:5%;">' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div>';
                })

            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const cancelarPedido = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/cancelarPedido?id_pedido=" + encodeURI(id),
                type: "PUT",
                crossDomain: true,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                'Access-Control-Allow-OSrigin': '*'
            })
            .then((response) => {
                alert('Pedido cancelado com sucesso.');
                if (window.location.href.includes('AdmAvaliacao')) {
                    window.location.href = '/www/AdmPedidos.html';
                } else (window.location.href.includes('MedicoAvaliacao')) 
                    window.location.href = '/www/MedicoPedidos.html';
                
                
            })
            .catch((error) => {
                alert('Cancelamento sem sucesso')
            });
    } else {
        alert('No login');
    }
}

const encaminharPedido = () => {
    if (localStorage.getItem('userSession')) {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id_pedido');
      const medChoice = document.getElementById('medicoDropdown').value; 
  
      $.ajax({
        url: "http://localhost:3050/encaminharPedido?id_pedido=" + encodeURI(id) + "&id_med=" + encodeURI(medChoice), 
        type: "POST",
        crossDomain: true,
        dataType: "json",
        headers: {
          "accept": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        'Access-Control-Allow-OSrigin': '*'
      })
      .then((response) => {
        console.log("id:", id);
        console.log("medChoice:", medChoice);
        alert('Pedido encaminhado com sucesso.');
        window.location.href = '/www/AdmPedidos.html';
      })
      .catch((error) => {
        alert('Encaminhamento sem sucesso');
      });
    } else {
      alert('No login');
    }
  }