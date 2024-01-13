const GetEstado = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/pedido?id_pedido=" + encodeURI(id),
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
                const estadoAvaliacao = response[0].estado_a;

                const stepperItems = document.querySelectorAll('.stepper-item');
                const stepperName = document.querySelectorAll('.step-name');

                if (estadoAvaliacao === "em analise") {
                    stepperItems[1].classList.remove('active');
                    stepperItems[1].classList.add('completed');
                    stepperItems[2].classList.add('active');
                } else if (estadoAvaliacao === "atribuido") {
                    stepperItems[2].classList.remove('active');
                    stepperItems[2].classList.add('completed');
                    stepperItems[1].classList.remove('active');
                    stepperItems[1].classList.add('completed');
                    stepperName[2].textContent = 'Atribuida';
                } else if (estadoAvaliacao === "nao atribuido") {
                    stepperItems[2].classList.remove('active');
                    stepperItems[2].classList.add('completed');
                    stepperItems[1].classList.remove('active');
                    stepperItems[1].classList.add('completed');
                    stepperName[2].textContent = 'Não atribuida';
                }
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        alert('No login');
    }
}

const GetAvaliacao = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/readAvaliacao?id_pedido=" + encodeURI(id),
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
                let containerAvaliacao = document.querySelector('[data-id="avaliacaoContainer"]');
                response.forEach(avaliacao => {
                    containerAvaliacao.innerHTML += '<div class="modal-content"><div class="modal-header"><span class="close">&times;</span><p class="result-title">Resultado</p></div><div class="modal-body"><span class="percentage">Percentagem: <span class="result">' + avaliacao.percentagem + '</span></span><p class="obv">Observações: <span class="result">' + avaliacao.observ_ava + '</span></p><div class="checkbox-div"><input type="checkbox" id="consulta" name="consulta" class="checkbox" /><label for="consulta" class="appointment-checkbox">Marcar consulta</span></label></div></div><div class="modal-footer"><button class="answer-btn" onclick="createConsultaAvaliacao()">Concluir</button></div></div>';
                    updateModalBtns();
                })
            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const createConsultaAvaliacao = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    const checkbox = document.getElementById('consulta');
    const cons = checkbox.checked;

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/createConsultaAvaliacao?id_pedido=" + encodeURI(id) + "&cons=" + encodeURI(cons),
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
                alert("Consulta requisitada com sucesso")
            })
            .catch((error) => {
                alert("Consulta requisitada sem sucesso")
                console.error(error)
            });
    } else {
        alert('No login');
    }
}