// src/utils/cryptoUtils.js

import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key'; // Secret key for encryption/decryption

// Function to encode a message
export const encodeMessage = (message) => {
  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
};

// Function to decode a message
export const decodeMessage = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
  return originalMessage;
};
