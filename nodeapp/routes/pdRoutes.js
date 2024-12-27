const express = require('express');
const {
    PDCreateFormData,
    PDDeleteFormData,
    PDGetAllFormData,
    PDGetFormDataById,
    updateShipmentStatus,
    UpdateDropOffTracking,
    UpdatePickUpTracking

} = require('../controllers/pickupDropController');

const router = express.Router();

router.post('/', PDCreateFormData);

router.patch('/update-status',updateShipmentStatus)

router.patch('/update-pickuptrack/:id',UpdatePickUpTracking)

router.patch('/update-dropofftrack/:id',UpdateDropOffTracking)

// router.get('/', PDGetAllFormData);

router.get('/:id', PDGetFormDataById);

// router.delete('/delete/:id', PDDeleteFormData);

module.exports = router;
