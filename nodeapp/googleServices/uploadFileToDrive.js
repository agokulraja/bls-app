const express = require('express');
const multer = require('multer');
const { uploadFileToDrive } = require('./googleDriveUtil');

const app = express();
const upload = multer(); 

app.post('/upload', upload.single('file'), async (req, res) => {
  const { file } = req; // The uploaded file
  const tokens = req.session.tokens; // Assume tokens are stored in session

  if (!tokens) {
    return res.status(401).send('Unauthorized: No tokens found');
  }

  try {
    const fileMetadata = await uploadFileToDrive(file.buffer, file.originalname, file.mimetype, tokens);
    res.status(200).json({
      message: 'File uploaded successfully',
      fileMetadata: fileMetadata,
    });
  } catch (error) {
    res.status(500).send('Failed to upload file');
  }
});

