const Stripe = require("stripe");
const Payment = require("../models/Payment");
require("dotenv").config();
const PickDrop = require('../models/PickDrop'); 
const { Op } = require('sequelize');
const moment = require('moment');  
const Users = require('../models/User');
const Comments = require('../models/Comments')
const { sendPickupEmail } = require('../utils/emailService');
const { Service } = require("../models");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

function generateTransactionId(userId, fromDataId) {
  const prefix = "BLSCS";

  const formattedUserId = userId.toString().padStart(4, '0');
  const formattedFromDataId = fromDataId.toString().padStart(4, '0');

  const transactionId = `${prefix}-${formattedUserId}-${formattedFromDataId}`;

  return transactionId;
}

const createPaymentIntent = async (req, res) => {
  const { serviceId, amount, formId, email, phonenumber } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad", 
            product_data: {
              name: `Courier ${serviceId} `, 
              images: ["https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif"], 
            },
            unit_amount:  amount * 100,
          },
          quantity: 1, 
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel`,
      customer_email: email, 
      automatic_tax: { enabled: true }, 
      metadata: {
        serviceId: serviceId,
        formId: formId,
        phonenumber: phonenumber, 
      },
    });
    await Payment.create({
      fromDataId: formId,
      amount: amount,
      status: "pending",
      sessionId: session.id,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
};

const confirmPayment = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    let status = "failed";

    if (session.payment_status === "paid") {
      status = "succeeded";
      const serviceId = session.metadata.serviceId;

      await Payment.update(
        { status: status },
        { where: { sessionId: sessionId } }
      );

      const payment = await Payment.findOne({
        where: { sessionId },
        attributes: ["amount", "fromDataId", "id", "emailSent"], // Include emailSent
        include: [
          {
            model: PickDrop,
            as: "pickupDetails",
            attributes: ["pickupEmail", "dropoffEmail", "serviceType", "pickupName", "dropoffName", "createdAt"],
          },
        ],
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      const { pickupDetails, amount, id, fromDataId, emailSent } = payment;
      const { serviceType, createdAt, pickupEmail, dropoffEmail, pickupName, dropoffName } = pickupDetails;

      let emailToSend = null;
      let name = null;
      let transactionId = generateTransactionId(id, fromDataId);
      let date = createdAt;

      if (serviceType === "droponly") {
        emailToSend = dropoffEmail;
        name = dropoffName;
      } else if (serviceType === "pickonly" || serviceType === "pickanddrop") {
        emailToSend = pickupEmail;
        name = pickupName;
      }

      // Check if the email has already been sent
      if (emailToSend && !emailSent) {
        await sendPickupEmail(emailToSend, name, serviceType, amount, transactionId, date);
        
        // Update the payment record to indicate that the email has been sent
        await Payment.update(
          { emailSent: true },
          { where: { sessionId: sessionId } }
        );
      }
    }

    res.status(200).json({ message: "Payment status updated", status: status });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: error.message });
  }
};



const getPaymentsWithPickupDetails = async (req, res) => {
  try {
    const data = await Payment.findAll({
      include: [
        {
          model: PickDrop,
          as: "pickupDetails",
          attributes: ["pickupName", "pickupContactNo", "pickupEmail", "serviceType"],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching payments with pickup details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPaymentPickupDetailsById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Payment.findOne({
      where: { id },
      include: [
        {
          model: PickDrop,
          as: "pickupDetails", 
          attributes: { exclude: [] },
          include: [
            {
              model: Comments,
              as: "comments",
              attributes: ["id","userId", "comment", "createdAt"],
              include: [
                {
                  model: Users,
                  as: "commentUser",
                  attributes: ["id", "userName", "email"],
                },
              ],
            },{
                model: Service,
                as: "service",
                attributes: ["serviceName"],
                required: false, 
              },
          ],
        },
      ],
    });

    if (!data) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching payment and pickup details by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getSuccessfulPayments = async (req, res) => {
  try {
    const data = await Payment.findAll({
      where: { status: "succeeded" }, 
      include: [
        {
          model: PickDrop,
          as: "pickupDetails",
          attributes: [
            "pickupName",
            "pickupContactNo",
            "pickupEmail",
            "serviceType",
            "cost",
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Errors fetching successful payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWeeklyPaymentData = async (req, res) => {
  try {
    const startOfWeek = moment().startOf('week').toDate();
    const endOfWeek = moment().endOf('week').toDate();

    const data = await Payment.findAll({
      where: {
        status: "succeeded",
        createdAt: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
      include: [
        {
          model: PickDrop,
          as: "pickupDetails",
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    const weeklyData = data.map(payment => {
      return {
        amount: parseFloat(payment.amount),
        createdAt: payment.createdAt,
      };
    });

    res.status(200).json({ weeklyData });
  } catch (error) {
    console.error("Error fetching weekly payment data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPaymentServiceTypeStats = async (req, res) => {
  try {
    const data = await Payment.findAll({
      where: { status: "succeeded" },
      include: [
        {
          model: PickDrop,
          as: "pickupDetails",
          attributes: ["serviceType"],
        },
      ],
    });

    // Group data by service type
    const serviceTypeStats = data.reduce((acc, payment) => {
      const { serviceType } = payment.pickupDetails;
      const amount = parseFloat(payment.amount);

      if (!acc[serviceType]) {
        acc[serviceType] = 0;
      }
      acc[serviceType] += 1;

      return acc;
    }, {});

    res.status(200).json({ serviceTypeStats });
  } catch (error) {
    console.error("Error fetching payment service type stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const getSalesReport = async (req, res) => {
  try {
    const { month, year } = req.query; // Accept month and year from query params
    
    if (!month || !year) {
      return res.status(400).json({ error: "Month and Year are required." });
    }

    // Parse and calculate start and end dates
    const startOfMonth = moment().year(year).month(month - 1).startOf('month').toDate();
    const endOfMonth = moment().year(year).month(month - 1).endOf('month').toDate();

    const data = await Payment.findAll({
      attributes: [
        [Payment.sequelize.fn("date", Payment.sequelize.col("createdAt")), "sale_date"], 
        [Payment.sequelize.fn("count", Payment.sequelize.col("id")), "total_sales"], 
      ],
      where: {
        status: "succeeded",
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth], 
        },
      },
      group: [Payment.sequelize.fn("date", Payment.sequelize.col("createdAt"))], 
      order: [[Payment.sequelize.fn("date", Payment.sequelize.col("createdAt")), "ASC"]],
      raw: true,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching daily sales report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {getSalesReport, getPaymentServiceTypeStats, getWeeklyPaymentData, getSuccessfulPayments, getPaymentPickupDetailsById, getPaymentsWithPickupDetails, confirmPayment, createPaymentIntent };