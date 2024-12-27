// formRoutes.js

const express = require('express');
const { updateForm } = require('../controllers/formController');  // Import controller
const router = express.Router();

// Define the PUT route for updating form data
router.put('/update-form/:id', updateForm);  // Calls the `updateForm` controller function

module.exports = router;
