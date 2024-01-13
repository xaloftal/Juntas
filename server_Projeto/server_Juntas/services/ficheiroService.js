const client = require('../Database/databaseJMAI');

module.exports = {
    GetFicheiro: (req, res) => {
        client.query("SELECT * from ficheiro f INNER JOIN pedido p ON f.id_pedido = p.id_pedido WHERE p.id_pedido = $1", [req.query.id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },



    CreateFicheiro: (req, res) => {
        client.query("call submeter_ficheiro($1, $2, $3)", [req.query.id_pedido, req.query.nome, req.query.ficheiro], (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results);
            res.send(results.rows);
        });
    },
}