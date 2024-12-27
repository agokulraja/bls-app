const express = require('express');

const {deleteFormData , getFormDataById, getAllFormData, createFormData, updateFormData} = require('../controllers/servicesController')

const router = express.Router();


router.post('/', createFormData);

router.get('/all-data', getAllFormData);

router.get('/:id', getFormDataById);

router.delete('/:id', deleteFormData);

router.put('/:id',updateFormData);

module.exports = router;
