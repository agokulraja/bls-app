const { google } = require('googleapis');
const { Readable } = require('stream'); // Import stream module

const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null); 
  return readable;
};

const uploadFileToDrive = async (fileBuffer, fileName, mimeType) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: '../../blsapp/nodeapp/googleServices/service-account-file.json',
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });

  const driveService = google.drive({ version: 'v3', auth });

  const response = await driveService.files.create({
    requestBody: {
      name: fileName,
      mimeType,
      parents:["1XkvGD5lSbiXk9WxQUZkZ0nd8XZFYviKo"]
    },
    media: {
      mimeType,
      body: bufferToStream(fileBuffer), // Convert buffer to stream here
    },
  });

  return response.data;
};

module.exports = { uploadFileToDrive };