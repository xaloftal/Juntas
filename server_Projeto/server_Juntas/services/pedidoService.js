const client = require('../Database/databaseJMAI');

module.exports = {
    CreatePedido: (req, res) => {
        client.query('call submeter_pedido($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15, $16, $17) RETURNING id_pedido', [req.query.date, req.query.nome, req.query.nus, req.query.nif, req.query.tel1, req.query.tel2, req.query.cc, req.query.ccval, req.query.datnas, req.query.fregn, req.query.codigo, req.query.rua, req.query.id_utente, req.query.fregr, req.query.concr, req.query.concn], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoAdmPrimeiro: (req, res) => {
        client.query("SELECT p.id_pedido, p.data_pedido, p.nome_u, u.*, MIN(p.data_pedido) AS min_data_pedido FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'submetido'  GROUP BY p.id_pedido, p.data_pedido, u.id_utente, p.nome_u, u.email_u", (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoMedPrimeiro: (req, res) => {
        client.query("SELECT p.id_pedido, p.data_pedido, p.nome_u, u.*, a.*, MIN(p.data_pedido) AS min_data_pedido FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente INNER JOIN avaliacao a ON p.id_pedido = a.id_pedido WHERE p.estado_p = 'em analise' AND a.id_medico = $1 GROUP BY p.id_pedido, p.data_pedido, u.id_utente, p.nome_u, u.email_u, a.id_avaliacao", [req.query.id_medico], (error, results) => {

            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoAdm: (req, res) => {
        client.query("SELECT p.*, u.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'submetido' AND p.data_pedido > (SELECT MIN(data_pedido) FROM pedido p WHERE estado_p = 'submetido' AND u.id_utente = p.id_utente)", (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedidoMed: (req, res) => {
        client.query("SELECT p.*, u.*, a.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente INNER JOIN avaliacao a ON p.id_pedido = a.id_pedido WHERE p.estado_p = 'em analise' AND a.id_medico = $1 AND p.data_pedido > (SELECT MIN(data_pedido) FROM pedido WHERE estado_p = 'em analise' AND u.id_utente = p.id_utente)", [req.query.id_medico], (error, results) => {
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
    ReadPedidoUtente: (req, res) => {
        client.query("SELECT p.*, u.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.id_utente = $1 AND p.estado_p = 'concluido'", [req.query.id_utente], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    DeletePedido: (req, res) => {
        client.query("call cancelar_pedido($1)", [req.query.id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    EncaminharPedido: (req, res) => {
        client.query("call reencaminhar_pedido($1, $2)", [req.query.id_pedido, req.query.id_med], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
}