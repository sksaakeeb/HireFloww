import { transporter } from "../configs/mail.js";
import { otpEmail } from "./mailTemplate.js";

export const sendVerificationEmail = async (email, verificationOTP) => {
  try {
    const emailHtml = otpEmail(verificationOTP, process.env.COMPANY_NAME);

    const info = await transporter.sendMail({
      from: `"Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email",
      html: emailHtml,
    });

    console.log("Verification email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};
