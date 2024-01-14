const client = require('../Database/databaseJMAI');

module.exports = {
    GetFicheiro: (req, res) => {
        client.query("SELECT f.* from ficheiro f INNER JOIN pedido p ON f.id_pedido = p.id_pedido WHERE p.id_pedido = $1", [req.query.id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },

    DownloadFicheiro: (req, res) => {
        client.query("SELECT f.* from ficheiro f WHERE f.id_ficheiro = $1", [req.query.id_ficheiro], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            if (results.rows.length) {
                res.download(results.rows[0].ficheiro, results.rows[0].nome)
            }
            else {
                res.sendStatus(404);
            }
        });
    },

    CreateFicheiro: (req, res) => {
        req.files.forEach(element => {
            client.query("call submeter_ficheiro($1, $2, $3)", [req.query.id_pedido, element.originalname, element.path], (error, results) => {
                if (error) {
                    throw error;
                }
                console.log(results);
            });
        });
        
        res.redirect('/www/UtenteHistorico.html');
    },
}