const client = require('../Database/databaseRNU');

module.exports = {
    GetLocais: (req, res) => {
        client.query('SELECT * FROM local', (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    CriarConsulta: (req, res) => {
        client.query('CALL pedido_consulta($1, $2, $3)', [req.query.id_pedido, req.query.id_utente, req.query.id_local], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}