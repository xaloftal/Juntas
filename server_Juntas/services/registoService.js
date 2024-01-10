const client = require('../Database/databaseJMAI');

module.exports = {
    RegistoUtente: (req, res) => {
        client.query('call registo_utente($1,$2,$3,$4)', [req.query.id, req.query.email, req.query.password, req.query.nus], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}