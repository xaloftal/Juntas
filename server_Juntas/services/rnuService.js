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
}