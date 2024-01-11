const client = require('../Database/databaseJMAI');

module.exports = {
    CreateMedicoAvaliacao: (req, res) => {
        client.query("call reencaminhar_pedido($1,$2)", [req.query.id_ped, req.query.id_medico], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },

}