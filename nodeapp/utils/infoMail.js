const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_INFO,
    pass: process.env.PASS_INFO,
  },
});

console.log("Info Email sending setup initialized");

const sendInfoEmail = async (
  recipientEmail, 
  pickupName,
  serviceType,
  amount,
  transactionId,
  paymentDate,
  pickupContactNo
) => {
  const mailOptions = {
    from: process.env.USER_INFO,
    to: "agokulraja00075@gmail.com",
    subject: "New Data Entry",
    bcc: "patel.jatin603@gmail.com, prabhaulakh1999@gmail.com",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px;">
        <h3 style="color: #2C3E50;">Hi Team,</h3>
        <p>There is 1 new entry in the Database.</p>
        <p>Please take actions ASAP. Below are the details:</p>
        <br>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #E2E8F0;">
          <thead>
            <tr style="background-color: #F7FAFC; color: #333;">
              <th style="padding: 12px; text-align: left; border: 1px solid #E2E8F0;">Detail</th>
              <th style="padding: 12px; text-align: left; border: 1px solid #E2E8F0;">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Transaction ID</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${transactionId}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Status</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">Pending</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Amount</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${amount}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Pickup Name</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${pickupName}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Pickup Contact No</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${pickupContactNo}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Service Type</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${serviceType}</td>
            </tr>
            <tr style="border: 1px solid #E2E8F0;">
              <td style="padding: 12px; border: 1px solid #E2E8F0;"><strong style="color: #C53030;">Pickup Email</strong></td>
              <td style="padding: 12px; border: 1px solid #E2E8F0;">${recipientEmail}</td>
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
    console.log("Info email sent successfully!");
  } catch (error) {
    console.error("Error sending info email:", error);
  }
};

module.exports = { sendInfoEmail };