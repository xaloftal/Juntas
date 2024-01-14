const GetFicheiros = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id_pedido');

    if (localStorage.getItem('userSession')) {
        $.ajax({
                url: "http://localhost:3050/getFicheiro?id_pedido=" + encodeURI(id),
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
                let containerFicheiro = document.querySelector('[data-id="ficheiroContainer"]');
                
                response.forEach(ficheiro => {
                    containerFicheiro.innerHTML += `
                        <div>
                            <div class="exam-one-file">
                                <p>%NAME%</p>
                                <button class="see-btn" onclick="window.location.href='%PATH%'\">
                                    Ver
                                </button>
                            </div>
                        </div>
                    `
                    .replace("%NAME%", ficheiro.nome)
                    .replace("%PATH%", "http://localhost:3050/downloadFicheiro?id_ficheiro=" + ficheiro.id_ficheiro)
                })

            })
            .catch((error) => {
                console.error(error)
            });
    } else {
        alert('No login');
    }

}