// driveController.js
const { uploadFileToDrive } = require('../googleServices/googleDriveUtil');

const uploadFile = async (req, res) => {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    try {
      const fileMetadata = await uploadFileToDrive(file.buffer, file.originalname, file.mimetype);
      res.status(200).json({
        message: 'File uploaded successfully',
        fileMetadata,
      });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };

module.exports = { uploadFile };