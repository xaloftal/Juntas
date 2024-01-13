const express = require('express');

const router = express.Router();

const cthService = require('../services/cthService');

router.get('/getLocais', cthService.GetLocais);
router.post('/createConsulta', cthService.CreateConsulta);

module.exports = router;