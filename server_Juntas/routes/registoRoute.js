const express = require('express');

const router = express.Router();

const registoService = require('../services/registoService');

router.post('/RegistoUtente', registoService.RegistoUtente);

module.exports = router;