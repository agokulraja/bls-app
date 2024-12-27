const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", 
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.HOSTINGER_USER, 
    pass: process.env.HOSTINGER_PASS, 
  },
});

console.log("Email sending setup initialized");

const sendPickupEmail = async (recipientEmail, name, serviceType, amount, transactionId,paymentDate) => {
  let serviceMessage = "";
  let notify="";

  switch (serviceType) {
    case "pickonly":
      serviceMessage = "pickup request";
      notify="We'll notify you once we have scheduled the pickup from your given address.";
      break;
    case "droponly":
      serviceMessage = "drop-off request";
      break;
    case "pickanddrop":
      serviceMessage = "pickup and drop-off request";
      notify="We'll notify you once we have scheduled the pickup from your given address.";
      break;
    default:
      serviceMessage = "service request";
      
  }

  const mailOptions = {
    from: process.env.HOSTINGER_USER,
    to: recipientEmail,
    subject:serviceMessage,
    bcc: "payments@blsindia-canada.ca, agokulraja00075@gmail.com, patel.jatin603@gmail.com, prabhaulakh1999@gmail.com",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h3>Hi ${name},</h3>
        <p>Thank you for choosing us. We have received your ${serviceMessage} and will soon start working on it.</p>
        <p>${notify}</p>
        <br>
        <p style="color: #C53030; font-weight: bold;">Payment Details:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #F7FAFC; color: #333; border: 1px solid #E2E8F0;">
              <th style="padding: 8px; text-align: left; border: 1px solid #E2E8F0;">Detail</th>
              <th style="padding: 8px; text-align: left; border: 1px solid #E2E8F0;">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 8px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Amount Paid</strong></td>
              <td style="padding: 8px; border: 1px solid #E2E8F0;">${amount}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0; background-color: #F7FAFC;">
              <td style="padding: 8px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Transaction ID</strong></td>
              <td style="padding: 8px; border: 1px solid #E2E8F0;">${transactionId}</td>
            </tr>
          </tbody>
        </table>
        <br>
        <p>Thanks and Regards,</p>
        <p>
          Email: <a href="mailto:info@blsindia-canada.ca">info@blsindia-canada.ca</a><br>
          Website: <a href="https://blsindia-canada.ca" target="_blank">blsindia-canada.ca</a>
        </p>
        <p style="color: #C53030; font-weight: bold;"><strong>BLS India Visa And Consular Services</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Pickup email sent successfully!");
  } catch (error) {
    console.error("Error sending pickup email:", error);
  }
};

module.exports = { sendPickupEmail };
