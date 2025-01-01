const express = require('express');
const cors = require('cors'); 
const sequelize = require('./config/database');
const driveRoutes = require('./routes/driveRoutes'); 
const pdformRoutes = require('./routes/pdRoutes')
const servicesRoutes = require('./routes/servicesRoutes')
const contactUsRoutes = require('./routes/contactRoutes')
const paymentRoutes  = require('./routes/paymentRoutes')
const trackRoutes = require('./routes/trackRoutes')
const formRoutes = require('./routes/formRoutes')
const servicesPaymentRoutes = require('./routes/servicePaymentRoutes')
const userRoutes = require('./routes/userRoutes')
const pagePermissions = require('./routes/userPermissionRoutes')
const pageRoutes = require("./routes/pageCreationRoutes");
const commentsRoutes = require('./routes/commentsRoutes')
const Stripe = require("stripe");
const Payment = require("./models/Payment");

const app = express();
const bodyParser = require("body-parser");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.use('/webhooks/stripe', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('API is running');
});

console.log("Hostinger Email:", process.env.HOSTINGER_USER);
console.log("Hostinger Password:", process.env.HOSTINGER_PASS);

app.use('/api/auth', userRoutes);
app.use('/api', driveRoutes);
app.use('/api/pdform', pdformRoutes);

// app.use('/api/services', servicesRoutes);
app.use('/api/contact-us', contactUsRoutes);
app.use('/api/payment', paymentRoutes); 
app.use('/api/payment/services', servicesPaymentRoutes);
app.use('/api/track', trackRoutes);
app.use('/api', formRoutes);  
app.use('/api/page-permissions', pagePermissions);
app.use("/api/verify", pageRoutes);
app.use("/api/comments",commentsRoutes)

const { sendPickupEmail } = require('./utils/emailService');

app.post('/send-pickup-email', async (req, res) => {
  const { recipientEmail, name } = req.body;

  if (!recipientEmail || !name) {
    return res.status(400).json({ error: "Recipient email and name are required." });
  }

  try {
    await sendPickupEmail(recipientEmail, name);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
});

const endpointSecret = process.env.ENDPOINTSECRET;
app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature']; // Stripe signature sent in headers
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Get your webhook secret key from the Stripe dashboard

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle different event types
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const { customer_email, metadata, amount_total } = session;
            const serviceId = metadata.serviceId;
            console.log("email",customer_email);
            // Update your database with the payment status
            await Payment.update(
                { status: 'succeeded' },
                { where: { sessionId: session.id } }
            );

            console.log("reached");
            // Send email confirmation (Make sure sendPickupEmail is implemented properly)
            await sendPickupEmail("bprachi443@gmail.com", "karan");
            break;
            

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!');

            // Update the database for a successful payment
            await Payment.update(
                { status: 'succeeded' },
                { where: { sessionId: paymentIntent.id } }
            );
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Respond to Stripe to acknowledge receipt of the event
    res.json({ received: true });
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully...');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    })
    .finally(() => {
        app.listen(3001, () => {
            console.log("Hostinger Email:", process.env.HOSTINGER_USER);
            console.log("Hostinger Password:", process.env.HOSTINGER_PASS);
            console.log('Server is running on port 3001...');
        });
    });





    
