const client = require('../Database/databaseJMAI');

module.exports = {
    CreatePedido: (req, res) => {
        client.query('call submeter_pedido($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15, $16)', [req.query.date, req.query.nome, req.query.nus, req.query.nif, req.query.tel1, req.query.tel2, req.query.cc, req.query.ccval, req.query.datnas, req.query.fregn, req.query.codigo, req.query.rua, req.query.id_utente, req.query.fregr, req.query.concr, req.query.concn], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoAdmPrimeiro: (req, res) => {
        client.query("SELECT p.id_pedido, p.data_pedido, p.nome_u, u.*, MIN(p.data_pedido) AS min_data_pedido FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'submetido' GROUP BY p.id_pedido, p.data_pedido, u.id_utente, p.nome_u, u.email_u", (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoAdm: (req, res) => {
        client.query("SELECT p.*, u.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'submetido' AND p.data_pedido > (SELECT MIN(data_pedido) FROM pedido WHERE estado_p = 'submetido' AND id_utente = p.id_utente)", (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedido: (req, res) => {
        client.query("SELECT p.* FROM pedido p WHERE p.id_pedido = $1", [req.query.id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}