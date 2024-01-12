
const express = require('express');

const router = express.Router();

const ficheiroService = require('../services/ficheiroService');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getFicheiro', ficheiroService.GetFicheiro);
router.post('/createFicheiro', upload.array('files', 10), ficheiroService.CreateFicheiro);

module.exports = router;
