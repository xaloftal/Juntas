const client = require('../Database/databaseJMAI');

module.exports = {
    CreatePedido: (req, res) => {
        let id_pedido = 0;
        client.query('call submeter_pedido($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)', [req.query.data, req.query.nome, req.query.nus, req.query.nif, req.query.tel1, req.query.tel2, req.query.cc, req.query.ccval, req.query.datnas, req.query.fregn, req.query.codigo, req.query.rua, req.query.id_utente, req.query.fregr, req.query.concr, req.query.concn, req.query.multi, req.query.veic, req.query.sub_n, req.query.sub_s, req.query.data_ant, id_pedido], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadCreatePedido: (req, res) => {
        client.query("SELECT p.*, u.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.id_utente = $1 AND p.estado_p = 'submetido'", [req.query.id_utente], (error, results) => {
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
        client.query("SELECT p.id_pedido, p.data_pedido, p.nome_u, u.*, a.*, MIN(p.data_pedido) AS min_data_pedido FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente INNER JOIN avaliacao a ON p.id_pedido = a.id_pedido WHERE p.estado_p = 'em analise' AND a.estado_a = 'em analise' AND a.id_medico = $1 GROUP BY p.id_pedido, p.data_pedido, u.id_utente, p.nome_u, u.email_u, a.id_avaliacao", [req.query.id_medico], (error, results) => {

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
        client.query("SELECT p.*, u.*, a.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente INNER JOIN avaliacao a ON p.id_pedido = a.id_pedido WHERE p.estado_p = 'em analise' AND a.estado_a = 'em analise' AND a.id_medico = $1 AND p.data_pedido > (SELECT MIN(data_pedido) FROM pedido p WHERE p.estado_p = 'em analise' AND u.id_utente = p.id_utente)", [req.query.id_medico], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadPedido: (req, res) => {
        if (req.query.id_pedido) {
            client.query("SELECT p.*, a.estado_a FROM pedido p INNER JOIN avaliacao a ON a.id_pedido = p.id_pedido WHERE p.id_pedido = $1", [req.query.id_pedido], (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results)
                res.send(results.rows)
            });
        } else if (req.query.id) {
            {
                client.query("SELECT * FROM pedido  WHERE id_pedido = $1", [req.query.id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results)
                    res.send(results.rows)
                });
            }
        }
    },
    ReadPedidoUtente: (req, res) => {
        client.query("SELECT p.*, u.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.id_utente = $1 ORDER BY (p.estado_p = 'em analise') DESC, p.estado_p;", [req.query.id_utente], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results)
            res.send(results.rows)
        });
    },
    ReadEstadoUtente: (req, res) => {
        if (req.query.email) {
            client.query("SELECT count(*), p.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'em analise' AND u.email_u = $1 GROUP BY p.id_pedido", [req.query.email], (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results)
                res.send(results.rows)
            });
        } else if (req.query.id_utente) {
            client.query("SELECT count(*), p.* FROM pedido p INNER JOIN utente u ON p.id_utente = u.id_utente WHERE p.estado_p = 'em analise' AND u.id_utente = $1 GROUP BY p.id_pedido", [req.query.id_utente], (error, results) => {
                if (error) {
                    throw error
                }
                res.send(results.rows)
            });
        }
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