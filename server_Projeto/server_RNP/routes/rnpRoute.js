const express = require('express');

const router = express.Router();

const rnpService = require('../services/rnpService');

router.get('/GetId', rnpService.GetIdMedico);

module.exports = router;