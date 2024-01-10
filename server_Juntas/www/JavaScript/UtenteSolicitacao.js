const createPedido = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        let currentDate = new Date().toLocaleDateString('en-GB');
        let name = document.querySelector('[data-id="name"]').value;
        let nus = document.querySelector('[data-id="nus"]').value;
        let nif = document.querySelector('[data-id="nif"]').value;
        let phoneOne = document.querySelector('[data-id="phoneOne"]').value;
        let phoneTwo = document.querySelector('[data-id="phoneOne"]').value;
        let cc = document.querySelector('[data-id="cc"]').value;
        let ccVal = document.querySelector('[data-id="ccVal"]').value;
        let birthday = document.querySelector('[data-id="birthday"]').value;
        let freg = document.querySelector('[data-id="freg"]').value;
        let code = document.querySelector('[data-id="code"]').value;
        let street = document.querySelector('[data-id="street"]').value;

        $.ajax({
                url: "http://localhost:3050/createPedido?name=" + encodeURI(name) + "&nus=" + encodeURI(nus) + "&nif=" + encodeURI(nif) + "&tel1=" + encodeURI(phoneOne) + "&tel2=" + encodeURI(phoneTwo) + "&cc=" + encodeURI(cc) + "&ccval=" + encodeURI(ccVal) + "&datnas=" + encodeURI(birthday) + "&freg=" + encodeURI(freg) + "&codigo=" + encodeURI(code) + "&rua=" + encodeURI(street) + "&id_utente=" + encodeURI(userSession.id) + "&data=" + encodeURI(currentDate),
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
                alert('Solicitação submetido')
                console.log(response);
            })
            .catch((error) => {
                alert('Solicitação não foi sobmetida. Verifique se os campos estão todos preenchidos')
            });

    } else {
        alert('No login');
    }

}

const GetDadosUtente = () => {
    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));

        $.ajax({
            url: "http://localhost:3050/GetDadosUtente?id_utente=" + encodeURI(userSession.id),
            type: "GET",
            crossDomain: false,
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

const setUserDataInForm = (userData) => {

    $('.form-input[name="name"]').val(userData.nome_u);
    $('.form-input[name="nus"]').val(userData.nus_u);
    $('.form-input[name="nif"]').val(userData.nif_u);
    $('.form-input[name="cc"]').val(userData.cc_num);
    $('.form-input[name="ccVal"]').val(userData.cc_val);
    $('.form-input-date[name="birthday"]').val(userData.dat_nasc);
    $('.form-input[name="freg"]').val(userData.freg);
    $('.form-input[name="code"]').val(userData.code);
    $('.form-input[name="street"]').val(userData.street);
    $('.form-input[name="phoneOne"]').val(userData.phoneOne);
    $('.form-input[name="phoneTwo"]').val(userData.phoneTwo);
 
}
