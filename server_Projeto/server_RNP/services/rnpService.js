const client = require('../Database/databaseRNP');

module.exports = {
    GetIdMedico: (req, res) => {
        client.query('SELECT id_medico FROM utente WHERE cedula = $1', [req.query.ced], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    GetDadosMedico: (req, res) => {
        const id_utente = parseInt(req.query.id);
        client.query('SELECT * FROM utentes WHERE id_utente = $1', [req.query.id_utente], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}