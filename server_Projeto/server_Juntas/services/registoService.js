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
    RegistoMedico: (req, res) => {
        client.query('call registo_medico($1,$2,$3,$4,$5)', [req.query.ced, req.query.nome, req.query.email, req.query.tele, req.query.pass], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}