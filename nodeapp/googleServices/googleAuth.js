// googleAuth.js
const { google } = require('googleapis');

// Google authentication setup with a service account
const googleAuth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const getDriveService = () => {
    const auth = googleAuth;
    return google.drive({ version: 'v3', auth });
};

module.exports = { getDriveService };