const express = require('express');
const { createContact } = require('../controllers/contactUsController');
const router = express.Router();

router.post('/', createContact);

module.exports = router;