const Stripe = require("stripe");
const Payment = require("../models/Payment");
const ServicesPayments = require("../models/ServicesPayments");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { serviceName, serviceId, amount, email } = req.body;
  
  try {
    const commissionRate = 0.034; // 2.9% as a decimal
    const totalAmount = Math.round(amount * (1 + commissionRate) * 100); // Amount in cents

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad", // Adjust the currency as needed
            product_data: {
              name: serviceName, // Name of the service
              images: ["https://res.cloudinary.com/dh8lem2fe/image/upload/v1730923835/images/btboul1xutmdzsopv0ou.avif"], // Replace with actual image URL if needed
            },
            unit_amount: totalAmount, // Amount in cents with commission
          },
          quantity: 1, // Quantity of the item
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&type=services`,
      cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel?type=services`,
      customer_email: email, // Set customer email
      automatic_tax: { enabled: true }, // Enables automatic tax calculation
      metadata: {
        serviceId: serviceName,
        formId: serviceId,
      },
    });

    // Store the payment record in your database
    await ServicesPayments.create({
      ServicesId: serviceId,
      amount: totalAmount / 100, // Store amount in dollars
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
    }

    // Update the payment status in your database
    await ServicesPayments.update(
      { status: status },
      { where: { sessionId: sessionId } }
    );

    res.status(200).json({ message: "Payment status updated", status: status });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { confirmPayment, createPaymentIntent };
