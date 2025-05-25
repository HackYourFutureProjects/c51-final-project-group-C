import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function sendResetEmail(email, resetToken) {
  // Creating OAuth2 client using credentials
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );

  // set the refresh token we receive from OAuth2 Playground
  oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN,
  });

  // generate a new access token using the refresh token
  const accessToken = await oauth2Client.getAccessToken();

  if (!accessToken || !accessToken.token) {
    throw new Error("Failed to generate reset token.");
  }

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken?.token,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset your password",
    html: `
      <p>Please reset your password: <a href="${resetLink}">${resetLink}</a></p>
    `,
  });
}
