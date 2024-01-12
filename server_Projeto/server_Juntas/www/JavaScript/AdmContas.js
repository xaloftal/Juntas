const GetContasMedico = () => {
    $.ajax({
            url: "http://localhost:3050/medicos",
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
            let containerMedico = document.querySelector('[data-id="contaMedicoContainer"]');
            response.forEach(contaMedico => {
                console.log(contaMedico);
                containerMedico.innerHTML += '<td>'+ contaMedico.nome_m +'</td><td class="right">'+ contaMedico.cedula +'</td><td class="right">'+ contaMedico.email_m +'</td><td class="right">'+ contaMedico.tel_med +'</td><td><button class="delete-account-btn" onclick="deleteContaMedico(\''+ contaMedico.email_m +'\')">Eliminar</button></td>';
            })

        })
        .catch((error) => {
            console.error(error)
        });
}

const deleteContaMedico = (email) => {

    $.ajax({
            url: "http://localhost:3050/deleteMedicos?email=" + email,
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
            document.querySelector(`[data-id="contaMedicoContainer"]`).innerHTML = '';
            alert('Conta eliminada com sucesso.');
            GetContasMedico();
        })
        .catch((error) => {
            alert('Eliminação sem sucesso')
        });

}