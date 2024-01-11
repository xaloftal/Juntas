
const express = require('express');

const router = express.Router();

const pedidoService = require('../services/pedidoService');

router.post('/createPedido', pedidoService.CreatePedido);
router.get('/pedidoAdmPrimeiro', pedidoService.ReadPedidoAdmPrimeiro);
router.get('/pedidoAdm', pedidoService.ReadPedidoAdm);

module.exports = router;
