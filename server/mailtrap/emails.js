import { sender, client } from "./mailtrap.config.js"
import { VERIFY_EMAIL, PASSWORD_RESET, PASSWORD_RESET_OK} from "./email.templates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "verify your email",
      html: VERIFY_EMAIL.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

  } catch (error) {
    console.log("error when sending email", error.message);
    throw new Error(`Error sending email: ${error}`);
  }
}

// export const sendWelcomeEmail = async (email, name) => {} 1:13:50

export const sendPasswordResetEmail = async (email, resetPasswordToken) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Email",
      html: PASSWORD_RESET.replace("{verificationCode}", resetPasswordToken),
      category: "Password Reset",
    });

  } catch (error) {
    console.log("error when sending email", error.message);
    throw new Error(`Error sending email: ${error}`);
  }
}


export const sendPasswordResetSuccessEmail = async (email) => {
  const recipients = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Success Email",
      html: PASSWORD_RESET_OK,
      category: "Password Reset Success",
    });

  } catch (error) {
    console.log("error when sending email", error.message);
    throw new Error(`Error sending email: ${error}`);
  }
}