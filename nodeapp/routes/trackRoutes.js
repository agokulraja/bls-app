const express = require('express');
const { trackApplications, trackShipment } = require('../controllers/trackController');
const router = express.Router();

router.post('/', trackApplications);
router.post('/shipment', trackShipment)

module.exports = router;