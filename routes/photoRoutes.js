const express = require('express');
const { uploadPhotoController } = require('../controllers/photoController');
const router = express.Router();

router.post('/upload', uploadPhotoController);

module.exports = router;
