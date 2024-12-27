// driveRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../controllers/driveController');

const router = express.Router();
const upload = multer(); // Use multer to handle file uploads

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;