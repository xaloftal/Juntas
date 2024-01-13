const client = require('../Database/databaseRNP');

module.exports = {
    GetIdMedico: (req, res) => {
        client.query('SELECT * FROM medico WHERE cedula = $1', [req.query.ced], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    GetDadosMedico: (req, res) => {
        client.query('SELECT * FROM medico WHERE id_medico = $1', [req.query.id_medico], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}