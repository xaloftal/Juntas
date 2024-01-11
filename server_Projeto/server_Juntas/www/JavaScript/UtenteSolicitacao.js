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

        $.ajax({
                url: "http://localhost:3050/createPedido?name=" + encodeURI(name) + "&nus=" + encodeURI(nus) + "&nif=" + encodeURI(nif) + "&tel1=" + encodeURI(phoneOne) + "&tel2=" + encodeURI(phoneTwo) + "&cc=" + encodeURI(cc) + "&ccval=" + encodeURI(ccVal) + "&datnas=" + encodeURI(birthday) + "&fregn=" + encodeURI(freg_natural) + "&codigo=" + encodeURI(code) + "&rua=" + encodeURI(street) + "&id_utente=" + encodeURI(userSession.id) + "&data=" + encodeURI(currentDate) + "&fregr=" + encodeURI(freg_residencia) + "&concr=" + encodeURI(conc_residencia) + "&concn=" + encodeURI(conc_natural),
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
                alert('Solicitação submetido');
                console.log(response);
            })
            .catch((error) => {
                alert('Solicitação não foi sobmetida. Verifique se os campos estão todos preenchidos')
            });

    } else {
        alert('No login');
    }

}

const createFicheiro = (id) => {
    if (localStorage.getItem('userSession')) {
        let name = document.querySelector('[data-id="name"]').value;
        let filesInput = document.getElementById('fileElem');
        let files = filesInput.files;

        let formData = new FormData();
        formData.append('id_pedido', id);
        formData.append('nome', name);

        for (const file of files) {
            formData.append('files', file);
        }

        $.ajax({
            url: "http://localhost:3000/createFicheiro",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function (response) {
                console.log(response);
                // Handle success, if needed
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText || error);
                // Handle error, if needed
            }
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
            let userData = response.data;
            setUserDataInForm(userData);
        })
        .catch((error) => {
            console.error(error)
        });
    } else {
        alert('No login');
    }
}

const setUserDataInForm = (userDataArray) => {
    if (userDataArray && userDataArray.length > 0) {
        let userData = userDataArray[0]; // Use the first element

        $('.form-input[name="name"]').val(userData.nome_utente);
        $('.form-input[name="nus"]').val(userData.nus);
        $('.form-input[name="nif"]').val(userData.nif);
        $('.form-input[name="cc"]').val(userData.cc_numero);
        $('.form-input-date[name="ccVal"]').val(userData.cc_validade);
        $('.form-input-date[name="birthday"]').val(userData.dat_nasc);
        $('.form-input[name="freg_natural"]').val(userData.freg_nat);
        $('.form-input-date[name="conc_natural"]').val(userData.conc_nat);
        $('.form-input[name="freg_residencia"]').val(userData.freg_res);
        $('.form-input[name="conc_residencia"]').val(userData.conc_res);
        $('.form-input[name="code"]').val(userData.cod_postal);
        $('.form-input[name="street"]').val(userData.rua);
        $('.form-input[name="phoneOne"]').val(userData.tele1);
        $('.form-input[name="phoneTwo"]').val(userData.tele2);
    } else {
        console.error("User data array is empty or undefined");
    }
}
