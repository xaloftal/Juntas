
const express = require('express');

const router = express.Router();

const pedidoService = require('../services/pedidoService');

router.post('/createPedido', pedidoService.CreatePedido);
router.get('/pedidoAdmPrimeiro', pedidoService.ReadPedidoAdmPrimeiro);
router.get('/pedidoMedPrimeiro', pedidoService.ReadPedidoMedPrimeiro);
router.get('/pedidoAdm', pedidoService.ReadPedidoAdm);
router.get('/pedidoMed', pedidoService.ReadPedidoMed);
router.get('/pedidoUtente', pedidoService.ReadPedidoUtente);
router.get('/pedidoEstadoUtente', pedidoService.ReadEstadoUtente);
router.get('/pedido', pedidoService.ReadPedido);
router.put('/cancelarPedido', pedidoService.DeletePedido);
router.post('/encaminharPedido', pedidoService.EncaminharPedido);

module.exports = router;
