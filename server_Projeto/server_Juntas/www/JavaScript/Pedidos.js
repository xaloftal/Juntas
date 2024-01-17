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
                    const formattedDate = formatDateString(pedido.data_pedido);
                    console.log(pedido);
                    containerPedido.innerHTML += '<tr class="item"><td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + formattedDate + '</td><td><button class="evaluate-btn" onclick=refPedido(\'' + pedido.id_pedido + '\')>Avaliar</button></td></tr>';
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
                    const formattedDate = formatDateString(pedido.data_pedido);
                    console.log(pedido);
                    containerPedido.innerHTML += '<tr class="item"><td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + formattedDate + '</td><td><button class="answer-btn" onclick=refPedidoMed(\'' + pedido.id_pedido + '\')>Responder</button></td></tr>';
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
                    const formattedDate = formatDateString(pedido.data_pedido);
                    console.log(pedido);
                    containerPedido.innerHTML += '<tr class="item"><td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + formattedDate + '</td></tr>';
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
                    const formattedDate = formatDateString(pedido.data_pedido);
                    console.log(pedido);
                    containerPedido.innerHTML += '<tr class="item"><td>' + pedido.nome_u + '<p class="med-email">' + pedido.email_u + '</p></td><td class="right">' + formattedDate + '</td></td></tr>';
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

function formatDateString(dateString) {

    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formattedDate;
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
                    let multiuso = 'Obtenção de atestado multiuso.'
                    let veiculo = 'Isenção do imposto sobre veículos.'
                    let submissao_n = 'Nunca foi submetido a uma Junta Médica.'
                    let submissao_s = 'Já foi submetido em '+ pedido.data_avaliacao_ant +', pretendendo uma reavaliação.'
                    const formattedDate = formatDateString(pedido.data_pedido);
                    const formattedCC = formatDateString(pedido.cc_val);
                    const formattedBirthday = formatDateString(pedido.dat_nasc);
                    if(pedido.multiuso == true && pedido.veiculo == true && pedido.submissao_n == true && pedido.submissao_s == false) {
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + multiuso + '</p><p class="filled-div">' + veiculo + '</p><p class="filled-div">' + submissao_n + '</p>';
                    } else if (pedido.multiuso == true && pedido.veiculo == true && pedido.submissao_s == true && pedido.submissao_n == false){
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + multiuso + '</p><p class="filled-div">' + veiculo + '</p><p class="filled-div">' + submissao_s + '</p>'
                    } else if (pedido.multiuso == true && pedido.veiculo == false && pedido.submissao_s == true && pedido.submissao_n == false) {
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + multiuso + '</p><p class="filled-div">' + submissao_s + '</p>'
                    } else if (pedido.multiuso == false && pedido.veiculo == true && pedido.submissao_s == true && pedido.submissao_n == false) {
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + veiculo + '</p><p class="filled-div">' + submissao_s + '</p>'
                    } else if (pedido.multiuso == true && pedido.veiculo == false && pedido.submissao_n == true && pedido.submissao_s == false) {
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + multiuso + '</p><p class="filled-div">' + submissao_n + '</p>'
                    } else if (pedido.multiuso == false && pedido.veiculo == true && pedido.submissao_n == true && pedido.submissao_s == false) {
                        containerPedido.innerHTML += '<div><p class="solicitation-header-title">Solicitação de Junta Médica<span class="solicitation-header-span" style="float:right;padding-right:1%">' + formattedDate + '</span></p></div><div class="solicitation-header-div"><p style="margin:0%">IDENTIFICAÇÃO</p></div><div class="space-div"><div class="name-div"><p>NOME</p></div><div class="filled-div"><p>' + pedido.nome_u + '</p></div></div><div class="space-div"><div class="name-div"><p>Nº DE UTENTE</p></div><div class="filled-div"><p>' + pedido.nus_u + '</p></div></div><div class="space-div"><div class="name-div"><p>BI/CC</p></div><div class="filled-div"><p>' + pedido.cc_num + '</p></div><div class="name-two-div"><p>VÁLIDO ATÉ</p></div><div class="filled-div"><p>' + formattedCC + '</p></div></div><div class="space-div"><div class="name-div"><p>NIF</p></div><div class="filled-div"><p>' + pedido.nif_u + '</p></div></div><div class="solicitation-header-div"><p>NATURALIDADE</p></div><div class="space-div"><div class="name-div"><p>DATA DE NASCIMENTO</p></div><div class="filled-div"><p>' + formattedBirthday + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_nat + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_nat + '</p></div></div><div class="solicitation-header-div"><p>RESIDÊNCIA</p></div><div class="space-div"><div class="name-div"><p>RUA</p></div><div class="filled-div"><p>' + pedido.rua + '</p></div></div><div class="space-div"><div class="name-div"><p>CÓDGIGO POSTAL</p></div><div class="filled-div"><p>' + pedido.cod_postal + '</p></div></div><div class="space-div"><div class="name-div"><p>FREGUESIA DE</p></div><div class="filled-div"><p>' + pedido.freg_res + '</p></div><div class="name-two-div"><p>CONCELHO</p></div><div class="filled-div"><p>' + pedido.conc_res + '</p></div></div><div class="space-div"><div class="name-div"><p>TELEFONE</p></div><div class="filled-div"><p>' + pedido.tele1 + '</p></div><div class="name-two-div"><p>OU</p></div><div class="filled-div"><p>' + pedido.tele2 + '</p></div></div><p class="filled-div">' + veiculo + '</p class="filled-div"><p class="filled-div">' + submissao_n + '</p>'
                    } 
                    
                    console.log(containerPedido.innerHTML);
        
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
                } else(window.location.href.includes('MedicoAvaliacao'))
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