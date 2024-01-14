
const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const ficheiroService = require('../services/ficheiroService');

router.get('/getFicheiro', ficheiroService.GetFicheiro);
router.get('/downloadFicheiro', ficheiroService.DownloadFicheiro);
router.post('/createFicheiro', upload.array('filename'), ficheiroService.CreateFicheiro);

module.exports = router;
