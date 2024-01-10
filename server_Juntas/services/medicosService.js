const client = require('../Database/databaseRNU');

module.exports = {
    GetMedicos: (req, res) => {
        client.query('SELECT * FROM medico', [req.query.nus], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },

    DeleteMedicos: (req, res) => {
        client.query('call eliminar_conta($1)', [req.query.email], (error, results) => {
            if (error) {
                throw error
            }
            res.send(results.rows)
        });
    }
}