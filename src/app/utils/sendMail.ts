import nodemailer from 'nodemailer';
import { config } from '../config';

const sendEmail = async (to: string, subject: string, emailBody: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: config.nodemailer_user,
      pass: config.nodemailer_pass,
    },
  });

  await transporter.sendMail({
    from: config.nodemailer_email,
    to,
    subject,
    // text: emailBody,
    html: emailBody,
  });
};

export default sendEmail;
