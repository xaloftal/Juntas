const createPedido = async () => {
    try {
        if (localStorage.getItem('userSession')) {
            let userSession = JSON.parse(localStorage.getItem('userSession'));

            let currentDate = new Date().toLocaleDateString('en-GB');
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
            let submissao_n = document.querySelector('[data-id="sub_n"]').checked;
            let submissao_s = document.querySelector('[data-id="sub_s"]').checked;
            let data_ant = document.querySelector('[data-id="data_ant"]').value;

            let pedido = await getEstadoPedido(userSession.email);

            if (pedido > 0) {
                alert("Já tem uma solicitação em análise. Vá para as solicitações");
                
            }

            if (submissao_n == true) {
                data_ant = "01/01/1900";
            }

            $.ajax({
                    url: "http://localhost:3050/createPedido?name=" + encodeURI(name) + "&nus=" + encodeURI(nus) + "&nif=" + encodeURI(nif) + "&tel1=" + encodeURI(phoneOne) + "&tel2=" + encodeURI(phoneTwo) + "&cc=" + encodeURI(cc) + "&ccval=" + encodeURI(ccVal) + "&datnas=" + encodeURI(birthday) + "&fregn=" + encodeURI(freg_natural) + "&codigo=" + encodeURI(code) + "&rua=" + encodeURI(street) + "&id_utente=" + encodeURI(userSession.id) + "&data=" + encodeURI(currentDate) + "&fregr=" + encodeURI(freg_residencia) + "&concr=" + encodeURI(conc_residencia) + "&concn=" + encodeURI(conc_natural) + "&multi=" + encodeURI(multi) + "&veic=" + encodeURI(veic) + "&sub_n=" + encodeURI(submissao_n) + "&sub_s=" + encodeURI(submissao_s) + "&data_ant=" + encodeURI(data_ant),
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
                    console.log(response);
                    return (response);
                })
                .catch((error) => {
                    alert('Solicitação não foi submetida. Verifique se os campos estão todos preenchidos')
                });

        } else {
            alert('No login');
        }
    } catch (error) {
        console.error("Error creating pedido:", error);
    }
};

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

    const birthday = formatDateString(userData.data_nascimento);
    const cc_val = formatDateString(userData.cc_validade);

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
                'Access-Control-Allow-OSrigin': '*'
            })
            .then((response) => {
                let containerDados = document.querySelector('[data-id="dadosContainer"]');
                let containerIncapacidade = document.querySelector('[data-id="incapacidadeContainer"]');

                if (response.length > 0) {
                    let dados = response[0];
                    containerDados.innerHTML += '<div class="solicitation-header-title">Dados pessoais</div><div class="form-header-div"><p>IDENTIFICAÇÃO</p></div><p class="data-text">Nome</p><div class="data-input" name="name">' + dados.nome_utente + '</div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Nº de Utente</p><div  class="data-input" name="nus">' + dados.nus + '</div></div><div class="form-div-two-inputs"><p class="data-text">Nº Contribuinte</p><div class="data-input" name="nif">' + dados.nif + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">BI/CC</p><div class="data-input" name="cc" >' + dados.cc_numero + '</div></div><div class="form-div-two-inputs"><p class="data-text">Validade</p><div class="data-input" name="ccVal">' + dados.cc_validade + '</div></div></div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Data de Nascimento</p><div class="data-input" name="birthday">' + dados.data_nascimento + '</div></div><div class="form-div-two-inputs"><p class="data-text">Telefone</p><div class="data-input">' + dados.telemovel + '</div></div></div><div class="form-header-div"><p>RESIDÊNCIA</p></div><p class="data-text">Rua</p><div class="data-input" name="street" >' + dados.rua + ', nº ' + dados.nmr_porta + '</div><p class="data-text">Código Postal</p><div class="data-input" name="code">' + dados.codigo_postal + '</div><div class="form-two-inputs"><div class="form-div-two-inputs"><p class="data-text">Freguesia de</p><div class="data-input" name="freg_residencia">' + dados.freguesia_morada + '</div></div><div class="form-div-two-inputs"><p class="data-text">Concelho</p><div class="data-input" name="conc_residencia">' + dados.concelho_morada + '</div></div></div>';
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

function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);

    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

const createFicheiro = (id) => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        const pedido = getEstadoPedido(userSession.email);
        const ficheiro = document.querySelector('[data-id="file"]').value;
        const nome = document.querySelector('[data-id="name-file"]').value;

        if (pedido) {
            alert("Já tem uma solicitação em análise. Vá para as solicitações")
        }

        $.ajax({
                url: "http://localhost:3050/createFicheiro?id_pedido=" + encodeURI(id) + "&nome=" + encodeURI(nome) + "&ficheiro=" + encodeURI(ficheiro),
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
                alert('Solicitação submetida');
                console.log(response);
                return (response);
            })
            .catch((error) => {
                alert('Insira um ficheiro')
            });

    } else {
        alert('No login');
    }
}