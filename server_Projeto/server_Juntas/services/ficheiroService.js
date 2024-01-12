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


        CreateFicheiro: async (req, res) => {
            const files = req.files;

            try {
                for (const file of files) {
                    await client.query('BEGIN');

                    // Modify this query based on your table structure
                    client.query("call submeter_ficheiro($1, $2, $3)", [req.query.id_pedido, req.query.nome, file.buffer], (error, results) => {
                        if (error) {
                            throw error;
                        }
                        console.log(results);
                        res.send(results.rows);

                        // Commit the transaction inside the callback
                        client.query('COMMIT');
                    });
                }
            } catch (error) {
                // Rollback the transaction if an error occurs
                await client.query('ROLLBACK');
                console.error(error);
            }
        }
}