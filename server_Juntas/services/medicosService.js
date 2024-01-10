const client = require('../Database/databaseRNU');

module.exports = {
    GetMedicos: (req, res) => {
        client.query('SELECT m.*, ut.*, e.* FROM medico m INNER JOIN especialidade e ON m.id_especialidade = e.id_especialidade INNER JOIN utilizador ut ON m.email_m = ut.email AND ut.estado_l = 'Existente';"', (error, results) => {
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