
const express = require('express');

const router = express.Router();

const medicosService = require('../services/medicosService');

router.get('/medicos', medicosService.GetMedicos);
router.put('/deleteMedicos', medicosService.DeleteMedicos);

module.exports = router;
