import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: import.meta.env.SMTP_SERVER,
  port: 587,
  auth: {
    user: import.meta.env.GMAIL_USER,
    pass: import.meta.env.GMAIL_PASS,
  },
});