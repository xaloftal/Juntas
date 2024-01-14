const express = require('express');

const router = express.Router();

const registoService = require('../services/registoService');

router.post('/registoUtente', registoService.RegistoUtente);
router.post('/registoMedico', registoService.RegistoMedico);

module.exports = router;