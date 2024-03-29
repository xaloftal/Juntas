const getCurrentDateFormatted = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const sec = String(today.getSeconds()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;

    return formattedDate;
}


const createPedido = async () => {
    try {
        if (localStorage.getItem('userSession')) {
            let userSession = JSON.parse(localStorage.getItem('userSession'));

            let currentDate = getCurrentDateFormatted();
            let name = document.querySelector('[data-id="name"]').value;
            let nus = document.querySelector('[data-id="nus"]').value;
            let nif = document.querySelector('[data-id="nif"]').value;
            let phoneOne = document.querySelector('[data-id="phoneOne"]').value;
            let phoneTwo = document.querySelector('[data-id="phoneTwo"]').value;
            let cc = document.querySelector('[data-id="cc"]').value;
            let ccVal = document.querySelector('[data-id="ccVal"]').value;
            let birthday = document.querySelector('[data-id="birthday"]').value;
            let freg_natural = document.querySelector('[data-id="freg_natural"]').value;
            let conc_natural = document.querySelector('[data-id="conc_natural"]').value;
            let freg_residencia = document.querySelector('[data-id="freg_residencia"]').value;
            let conc_residencia = document.querySelector('[data-id="conc_residencia"]').value;
            let code = document.querySelector('[data-id="code"]').value;
            let street = document.querySelector('[data-id="street"]').value;
            let multi = document.querySelector('[data-id="multi"]').checked;
            let veic = document.querySelector('[data-id="veic"]').checked;
            let submissao_n = document.querySelector('input[name="obtencao3"]:checked').value;
            let submissao_s = 0;
            let data_ant = document.querySelector('[data-id="data_ant"]').value;

            let pedido = await getEstadoPedido(userSession.email);
            console.log(pedido.length);
            if (pedido.length > 0) {
                alert("Já tem uma solicitação em análise. Vá para as solicitações");
                window.location.href = './UtenteHistorico.html';
                return;
            }

            if (submissao_n == 'true') {
                submissao_n = true;
                submissao_s = false;
                data_ant = "01/01/1900";
            } else if (submissao_n == 'false') {
                submissao_s = true;
                submissao_n = false;
            }

            console.log(submissao_n, submissao_s);

            try {
                const response = await $.ajax({
                    url: "http://localhost:3050/createPedido?data=" + encodeURI(currentDate) + "&nome=" + encodeURI(name) + "&nus=" + encodeURI(nus) + "&nif=" + encodeURI(nif) + "&tel1=" + encodeURI(phoneOne) + "&tel2=" + encodeURI(phoneTwo) + "&cc=" + encodeURI(cc) + "&ccval=" + encodeURI(ccVal) + "&datnas=" + encodeURI(birthday) + "&fregn=" + encodeURI(freg_natural) + "&codigo=" + encodeURI(code) + "&rua=" + encodeURI(street) + "&id_utente=" + encodeURI(userSession.id) + "&fregr=" + encodeURI(freg_residencia) + "&concr=" + encodeURI(conc_residencia) + "&concn=" + encodeURI(conc_natural) + "&multi=" + encodeURI(multi) + "&veic=" + encodeURI(veic) + "&sub_n=" + encodeURI(submissao_n) + "&sub_s=" + encodeURI(submissao_s) + "&data_ant=" + encodeURI(data_ant),
                    type: "POST",
                    crossDomain: true,
                    dataType: "json",
                    headers: {
                        "accept": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    'Access-Control-Allow-OSrigin': '*'
                })

                console.log(response)
                return response

            } catch (error) {
                alert('Solicitação não foi submetida. Verifique se os campos estão todos preenchidos.');
            }
        } else {
            alert('No login');
        }
    } catch (error) {
        console.error("Erro ao criar o pedido:", error);
    }
}

const GetDadosUtente = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3000/GetDadosUtente?id_utente=" + encodeURI(userSession.id),
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
                let userData = response[0];

                console.log(userData);
                setUserDataInForm(userData);
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const setUserDataInForm = (userData) => {

    let birthday = formatDateStringData(userData.data_nascimento);
    let cc_val = formatDateStringData(userData.cc_validade);

    document.querySelector('[name="name"]').value = String(userData.nome_utente);
    document.querySelector('[name="nus"]').value = String(userData.nus);
    document.querySelector('[name="nif"]').value = String(userData.nif);
    document.querySelector('[name="cc"]').value = String(userData.cc_numero);
    document.querySelector('[name="ccVal"]').value = String(cc_val);
    document.querySelector('[name="birthday"]').value = String(birthday);
    document.querySelector('[name="freg_residencia"]').value = String(userData.freguesia_morada);
    document.querySelector('[name="conc_residencia"]').value = String(userData.concelho_morada);
    document.querySelector('[name="code"]').value = String(userData.codigo_postal);
    document.querySelector('[name="street"]').value = String(userData.rua + ", nº " + userData.nmr_porta);
    document.querySelector('[name="phoneOne"]').value = String(userData.telemovel);
}

const setData = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
                url: "http://localhost:3000/GetDadosUtente?id_utente=" + encodeURI(userSession.id),
                type: "GET",
                crossDomain: true,
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
            .then((response) => {
                let containerDados = document.querySelector('[data-id="dadosContainer"]');
                let containerIncapacidade = document.querySelector('[data-id="incapacidadeContainer"]');

                if (response.length > 0) {
                    let dados = response[0];
                    const formattedCC = formatDateString(dados.cc_val);
                    const formattedBirthday = formatDateString(dados.data_nascimento);
                    containerDados.innerHTML += '<div class="solicitation-header-title">Dados pessoais</div><div class="form-header-div"><p>IDENTIFICAÇÃO</p></div><p class="data-text">Nome</p><div class="data-input" name="name">' + dados.nome_utente + '</div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Nº de Utente</p><div  class="data-input" name="nus">' + dados.nus + '</div></div><div class="form-div-two-inputs"><p class="data-text">Nº Contribuinte</p><div class="data-input" name="nif">' + dados.nif + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">BI/CC</p><div class="data-input" name="cc" >' + dados.cc_numero + '</div></div><div class="form-div-two-inputs"><p class="data-text">Validade</p><div class="data-input" name="ccVal">' + formattedCC + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Data de Nascimento</p><div class="data-input" name="birthday">' + formattedBirthday + '</div></div><div class="form-div-two-inputs"><p class="data-text">Telefone</p><div class="data-input">' + dados.telemovel + '</div></div></div><div class="form-header-div"><p>RESIDÊNCIA</p></div><p class="data-text">Rua</p><div class="data-input" name="street" >' + dados.rua + ', nº ' + dados.nmr_porta + '</div><p class="data-text">Código Postal</p><div class="data-input" name="code">' + dados.codigo_postal + '</div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Freguesia de</p><div class="data-input" name="freg_residencia">' + dados.freguesia_morada + '</div></div><div class="form-div-two-inputs"><p class="data-text">Concelho</p><div class="data-input" name="conc_residencia">' + dados.concelho_morada + '</div></div></div>';
                }
                response.forEach(incapacidade => {
                    containerIncapacidade.innerHTML += '<div class="border"><p class="data-text">Percentagem de incapacidade atribuida</p><div class="data-input">' + incapacidade.percentagem + '</div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Capítulo</p><div class="data-input">' + incapacidade.capitulo + '</div></div><div class="form-div-two-inputs"><p class="data-text">Número</p><div class="data-input">' + incapacidade.numero + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Alínea</p><div class="data-input">' + incapacidade.alinea + '</div></div><div class="form-div-two-inputs"><p class="data-text">Coeficiente</p><div class="data-input">' + incapacidade.coeficiente + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Capacidade restante</p><div class="data-input">' + incapacidade.capacidade_restante + '</div></div><div class="form-div-two-inputs"><p class="data-text">Desvalorização</p><div class="data-input">' + incapacidade.desvalorizacao + '</div></div></div></div>';
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

function formatDateStringData(originalDateString) {
    const originalDate = new Date(originalDateString);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}