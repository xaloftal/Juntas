
const express = require('express');

const router = express.Router();

const avaliacaoService = require('../services/avaliacaoService');

router.post('/createAvaliacaoMedico', avaliacaoService.CreateMedicoAvaliacao);
router.get('/avaliacao', avaliacaoService.ReadAvaliacao);
router.put('/createConsultaAvaliacao', avaliacaoService.CreateConsultaAvaliacao);

module.exports = router;
