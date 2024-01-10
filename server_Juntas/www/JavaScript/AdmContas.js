const GetContasMedico = () => {
    $.ajax({
            url: "http://localhost:3050/medicos",
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
            let containerMedico = document.querySelector('[data-id="contaMedicoContainer"]');
            response.forEach(contaMedico => {
                console.log(contaMedico);
                containerMedico.innerHTML += '<div class="data-name-div"><div class="data-med-name">' + contaMedico.nome_m + '</div></div><div class="data-number">' + contaMedico.cedula + '</div><div class="data-email">' + contaMedico.email_m + '</div><div class="data-phone">233453</div><button class="delete-account-btn">Eliminar</button>';
            })

            updateModalBtns();
        })
        .catch((error) => {
            console.error(error)
        });
}

const deleteContaMedico = (email) => {

    $.ajax({
            url: "http://localhost:3050/EliminarConta?email=" + email,
            type: "PUT",
            crossDomain: false,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-OSrigin': '*'
        })
        .then((response) => {
            document.querySelector(`[data-id="contaMedicoContainer"]`).innerHTML = '';
            alert('Conta eliminada com sucesso.');
            GetContasMedico();
        })
        .catch((error) => {
            alert('Eliminação sem sucesso')
        });
}