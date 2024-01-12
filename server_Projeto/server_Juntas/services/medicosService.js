const client = require('../Database/databaseJMAI');

module.exports = {
    GetMedicos: (req, res) => {
        client.query("SELECT m.* FROM medico m INNER JOIN utilizador u ON m.email_m = u.email WHERE u.estado_u = 'ativo'", (error, results) => {
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