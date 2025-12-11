// server/controllers/emailController.js
const nodemailer = require('nodemailer');
const axios = require('axios');

exports.sendContactEmail = async (name, email, message) => {
  // ---- CASE 1: RESEND ----
  if (process.env.RESEND_API_KEY) {
    await axios.post(
      "https://api.resend.com/emails",
      {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `New contact form message from ${name}`,
        html: `
          <h2>New Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>${message}</p>
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return;
  }

  // ---- CASE 2: SMTP (Nodemailer) ----
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `New contact form message from ${name}`,
    text: message,
    html: `<p>${message}</p>`,
  });
};
