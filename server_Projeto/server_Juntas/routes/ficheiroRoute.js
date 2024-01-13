
const express = require('express');

const router = express.Router();

const ficheiroService = require('../services/ficheiroService');

router.get('/getFicheiro', ficheiroService.GetFicheiro);
router.post('/createFicheiro', ficheiroService.CreateFicheiro);

module.exports = router;
