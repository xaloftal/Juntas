
const express = require('express');

const router = express.Router();

const avaliacaoService = require('../services/avaliacaoService');

router.post('/createAvaliacaoMedico', avaliacaoService.CreateMedicoAvaliacao);

module.exports = router;
