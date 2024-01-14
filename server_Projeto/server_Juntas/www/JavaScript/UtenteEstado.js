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
                GetLocais();
                response.forEach(avaliacao => {
                    if (avaliacao.estado_p == 'avaliado') {
                        containerAvaliacao.innerHTML += '<div class="modal-content"><div class="modal-header"><span class="close">&times;</span><p class="result-title">Resultado</p></div><div class="modal-body"><span class="percentage">Percentagem: <span class="result">' + avaliacao.percentagem + '</span></span><p class="obv">Observações: <span class="result">' + avaliacao.observ_ava + '</span></p><div class="checkbox-div"><input type="checkbox" id="consulta" name="consulta" class="checkbox" /><label for="consulta" class="appointment-checkbox">Marcar consulta</span></label></div><select id="localDropdown" name="local" class="chooser-local"><option value="-1">Se sim, escolha um local</option></select></div><div class="modal-footer"><button class="answer-btn" onclick="createConsultaAvaliacao()">Concluir</button></div></div>';

                    } else if (avaliacao.estado_p == 'concluido') {
                        containerAvaliacao.innerHTML += '<div class="modal-content"><div class="modal-header"><span class="close">&times;</span><p class="result-title">Resultado</p></div><div class="modal-body"><span class="percentage">Percentagem: <span class="result">' + avaliacao.percentagem + '</span></span><p class="obv">Observações: <span class="result">' + avaliacao.observ_ava + '</span></p></div>';
                    }
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

    if (cons == true) {
        createConsultaLocal(id);
    }

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

            })
            .catch((error) => {
                alert("Consulta requisitada sem sucesso")
                console.error(error)
            });
    } else {
        alert('No login');
    }
}

const createConsultaLocal = (id_pedido) => {

    const id_local = document.querySelector('select[id="localDropdown"]').value;

    if (localStorage.getItem('userSession')) {
        let userSession = JSON.parse(localStorage.getItem('userSession'));
        $.ajax({
                url: "http://localhost:3002/createConsulta?id_pedido=" + encodeURI(id_pedido) + "&id_utente=" + encodeURI(userSession.id) + "&id_local=" + encodeURI(id_local),
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
                alert("Consulta requisitada com sucesso")
                window.location.href = '/www/UtenteHistorico.html';
            })
            .catch((error) => {
                alert("Consulta requisitada sem sucesso")
                console.error(error)
            });
    } else {
        alert('No login');
    }
}