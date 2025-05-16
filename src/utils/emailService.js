// src/utils/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create nodemailer transporter
let transporter;

if (process.env.NODE_ENV === 'production') {
  // Production transporter (e.g., using SendGrid, Mailgun, etc.)
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} else {
  // Development transporter (using ethereal.email for testing)
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.DEV_EMAIL_USER || 'ethereal_user',
      pass: process.env.DEV_EMAIL_PASSWORD || 'ethereal_password'
    }
  });
}

// Send email function
exports.sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'Finance Tracker <noreply@financetracker.com>',
    to: options.to,
    subject: options.subject,
    html: options.html
  };

  return await transporter.sendMail(mailOptions);
};
