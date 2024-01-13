const client = require('../Database/databaseJMAI');

module.exports = {
    CreateMedicoAvaliacao: (req, res) => {
        client.query("call responder_pedido($1,$2,$3,$4)", [req.query.id_ped, req.query.data, req.query.percent, req.query.obsv], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadAvaliacao: (req, res) => {
        client.query("SELECT * FROM avaliacao WHERE id_pedido = $1", [req.query.id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    CreateConsultaAvaliacao: (req, res) => {
        client.query("call responder_pedido_utente($1, $2)", [req.query.id_pedido, req.query.cons], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}