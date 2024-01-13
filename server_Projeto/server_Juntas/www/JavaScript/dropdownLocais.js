const populateDropdownLocal = (data) => {
    const dropdown = $("#localDropdown");

    data.forEach(item => {
        dropdown.append(`<option value="${item.id_local}">${item.nome_local}</option>`);
    });
};

const GetLocais = () => {
    $.ajax({
            url: "http://localhost:3002/getLocais",
            type: "GET",
            crossDomain: true,
            dataType: "json",
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            'Access-Control-Allow-Origin': '*'
        })
        .then((response) => {
            console.log(response)
            populateDropdownLocal(response);
        })
        .catch((error) => {
            console.error(error);
        });
}