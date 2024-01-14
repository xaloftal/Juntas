
const express = require('express');

const router = express.Router();

const loginService = require('../services/loginService');

router.get('/login', loginService.DoLogin);

module.exports = router;
