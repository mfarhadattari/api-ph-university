import jwt from 'jsonwebtoken';
import sendEmail from '../../utils/sendMail';
import { IJWTPayload } from './auth.interface';

export const createJWTToken = (
  jwtPayload: IJWTPayload,
  jwtSecret: string,
  jwtConfig: Record<string, unknown>,
) => {
  const jwtToken = jwt.sign(jwtPayload, jwtSecret, jwtConfig);
  return jwtToken;
};

export const sendResetPasswordMail = (email: string, resetLink: string) => {
  const regx = /^([^.@-]+)(?:[.-]([^@]+))?/;
  const match = email.match(regx);
  const userName = match?.slice(1, match.length).join(' ').toUpperCase();

  const emailBody = `<div style="font-family: sans-serif; padding: 20px;">
    <h1>Password Reset Request</h1>
    <p>Hi ${userName},</p>
    <p>We've received a request to reset your password for your account at PH University.</p> 
    <p>To reset your password, please click the button below:</p>
    <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 25px; margin: 20px auto; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>For security reasons, this link will expire in 5 minute.</p>
    <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
    <p>Thanks,<br>PH University Team</p>
  </div>`;

  sendEmail(email, 'Please reset password', emailBody);
};
