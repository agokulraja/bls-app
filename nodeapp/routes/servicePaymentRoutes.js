const express = require("express");
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require("../controllers/servicesPaymentController");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/confirm-payment", confirmPayment);

module.exports = router;
