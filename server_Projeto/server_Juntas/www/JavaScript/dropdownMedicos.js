const populateDropdownMedico = (data) => {
  const dropdown = $("#medicoDropdown");

  data.forEach(item => {
      dropdown.append(`<option value="${item.id_medico}">${item.nome_m}</option>`);
  });
};

const GetMedicos = () => {
  $.ajax({
          url: "http://localhost:3050/medicos",
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
          populateDropdownMedico(response);
      })
      .catch((error) => {
          console.error(error);
      });
}
