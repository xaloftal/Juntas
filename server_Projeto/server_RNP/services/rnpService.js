const client = require('../Database/database');

module.exports = {
    GetIdUtente: (req, res) => {
        client.query('SELECT id_utente FROM utente WHERE nus_u = $1', [req.query.nus], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    GetDadosUtente: (req, res) => {
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