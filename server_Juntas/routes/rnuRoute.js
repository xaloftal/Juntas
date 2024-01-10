const express = require('express');

const router = express.Router();

const rnuService = require('../services/rnuService');

router.get('/GetId', rnuService.GetIdUtente);

module.exports = router;