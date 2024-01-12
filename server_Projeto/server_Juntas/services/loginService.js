const client = require('../Database/databaseJMAI');

module.exports = {
    DoLogin: (req, res) => {
        client.query('WITH unioned_data AS (' +
        '    SELECT id_utente AS id, email_u AS email FROM utente ' +
        '    UNION ALL ' +
        '    SELECT id_adm AS id, email_a AS email FROM administrativo ' +
        '    UNION ALL ' +
        '    SELECT id_medico AS id, email_m AS email FROM medico ' +
        ')' +
        'SELECT t1.*, u2.pass, u2.estado_u ' +
        'FROM unioned_data t1 ' +
        'LEFT JOIN utilizador u2 ON u2.email = t1.email ' +
        'WHERE u2.email = $1 AND u2.pass = $2;', [req.query.email, req.query.password], (error, results) => {

            if (error) {
                throw error
            }

            res.send(results.rows)
        });
    }
}