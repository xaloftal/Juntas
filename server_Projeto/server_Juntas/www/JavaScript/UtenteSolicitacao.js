const createPedido = () => {
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
        let multi = document.querySelector('[data-id="multi"]').value;
        let veic = document.querySelector('[data-id="veic"]').value;
        let submissao_n = document.querySelector('[data-id="sub_n"]').value;
        let submissao_s = document.querySelector('[data-id="sub_s"]').value;
        let data_ant = document.querySelector('[data-id="data_ant"]').value;

        const pedido = getEstadoPedido(userSession.email);

        if (pedido) {
            alert("Já tem uma solicitação em análise. Vá para as solicitações")
        }

        if (encodeURI(submissao_n) == true) {
            data_ant = null;
        }

        $.ajax({
                url: "http://localhost:3050/createPedido?name=" + encodeURI(name) + "&nus=" + encodeURI(nus) + "&nif=" + encodeURI(nif) + "&tel1=" + encodeURI(phoneOne) + "&tel2=" + encodeURI(phoneTwo) + "&cc=" + encodeURI(cc) + "&ccval=" + encodeURI(ccVal) + "&datnas=" + encodeURI(birthday) + "&fregn=" + encodeURI(freg_natural) + "&codigo=" + encodeURI(code) + "&rua=" + encodeURI(street) + "&id_utente=" + encodeURI(userSession.id) + "&data=" + encodeURI(currentDate) + "&fregr=" + encodeURI(freg_residencia) + "&concr=" + encodeURI(conc_residencia) + "&concn=" + encodeURI(conc_natural) + "&multi=" + encodeURI(multi) + "&veic=" + encodeURI(veic)  + "&sub_n=" + encodeURI(submissao_n)  + "&sub_s=" + encodeURI(submissao_s)  + "&data_ant=" + encodeURI(data_ant),
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
                return(response);
            })
            .catch((error) => {
                alert('Solicitação não foi submetida. Verifique se os campos estão todos preenchidos')
            });

    } else {
        alert('No login');
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

    document.querySelector('.form-input[name="name"]').value = String(userData.nome_utente);
    document.querySelector('.form-input[name="nus"]').value = String(userData.nus);
    document.querySelector('.form-input[name="nif"]').value = String(userData.nif);
    document.querySelector('.form-input[name="cc"]').value = String(userData.cc_numero);
    document.querySelector('.form-input-date[name="ccVal"]').value = String(cc_val);
    document.querySelector('.form-input-date[name="birthday"]').value = String(birthday);
    document.querySelector('.form-input[name="freg_residencia"]').value = String(userData.freguesia_morada);
    document.querySelector('.form-input[name="conc_residencia"]').value = String(userData.concelho_morada);
    document.querySelector('.form-input[name="code"]').value = String(userData.codigo_postal);
    document.querySelector('.form-input[name="street"]').value = String(userData.rua + ", nº " + userData.nmr_porta);
    document.querySelector('.form-input[name="phoneOne"]').value = String(userData.telemovel);
}

function formatDateString(originalDateString) {
    const originalDate = new Date(originalDateString);
    
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
    const day = String(originalDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
