const express = require("express");
const router = express.Router();
const {getSalesReport, getSuccessfulPayments,createPaymentIntent, confirmPayment, getPaymentsWithPickupDetails,getPaymentPickupDetailsById,getPaymentServiceTypeStats, getWeeklyPaymentData  } = require("../controllers/paymentController");
router.post("/create-payment-intent", createPaymentIntent);
router.post("/confirm-payment", confirmPayment);
router.get("/payments", getPaymentsWithPickupDetails);
router.get("/payments/:id", getPaymentPickupDetailsById);
router.get("/success/successful", getSuccessfulPayments);
router.get("/success/serviceTypeStats", getPaymentServiceTypeStats);
router.get("/success/week", getWeeklyPaymentData);
router.get("/sales-report", getSalesReport);
// router.get("/previous-sales-report", getPreviousMonthSalesReport);

module.exports = router;
