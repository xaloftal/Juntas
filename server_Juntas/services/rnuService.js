const client = require('../Database/databaseRNU');

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
        client.query('SELECT u.*, m.*, c.* FROM utente u INNER JOIN morada m ON u.id_morada = m.id_morada INNER JOIN codigo_postal c ON u.id_morada = m.id_morada WHERE id_utente = $1', [req.query.id], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}