const getCurrentDateFormatted = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return yyyy + '-' + mm + '-' + dd;
}

const criarAvaliacao = () => {
    if (localStorage.getItem('userSession')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id_pedido');
        const currentDate = getCurrentDateFormatted();
        let percentage = document.querySelector('[data-id="percentage"]').value;
        let obv = document.querySelector('[data-id="obv"]').value;

        $.ajax({
                url: "http://localhost:3050/createAvaliacaoMedico?id_ped=" + encodeURI(id) + "&data=" + encodeURI(currentDate) + "&percent=" + encodeURI(percentage) + "&obsv=" + encodeURI(obv),
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
                alert('Avaliação feita com sucesso.');
                window.location.href = '/www/MedicoPedidos.html';
            })
            .catch((error) => {
                alert('Avaliação sem sucesso');
            });
    } else {
        alert('No login');
    }
}

