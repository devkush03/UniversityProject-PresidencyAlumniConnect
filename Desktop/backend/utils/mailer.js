import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { convert } from 'html-to-text';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// const sendEmail = async (to, subject, html) => {
//   const text = convert(html, {
//     wordwrap: 130
//   });

//   const mailOptions = {
//     from: "CS-PU",
//     to,
//     subject,
//     text,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };


const sendEmail = async (to, subject, html) => {
  console.log(`📧 Attempting to send email to: ${to}`); // Debug log

  const text = convert(html, { wordwrap: 130 });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent Successfully:", info.response);
  } catch (error) {
    console.error("❌ Email Sending Failed:", error);
  }
};



export default sendEmail;
