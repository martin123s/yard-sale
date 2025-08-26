import crypto from 'crypto'
import bcrypt from 'bcryptjs'

import { generateJWT } from "../utils/generateJWT.js";
import { sendVerificationEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";



export const signup = async (req, res) => {
  const { username, email, password} = req.body;
  try {

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }


    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationTokenExpiredAt = Date.now() + 24 * 60 * 60 * 1000;

    const user = new User({
      username,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiredAt
    });

    await user.save();
    generateJWT(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "user successfully created", 
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const verifyEmail = async (req, res) => { 
  const { code } = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: {$gt: Date.now()}
    })
    
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or Expired Verification Token"})
    }
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiredAt = undefined
    await user.save()
    // await sendWelcomeEmail(user.email, user.name) 1:08:35 in case needed

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({success: false, message: "User does not exist"})
    }
    const pwd = await bcrypt.compare(password, user.password)
    if (!pwd) {
      return res.status(400).json({success: false, message: "Invalid password"})
    }

    generateJWT(res, user._id)

    res.status(200).json({
      success: true,
      message: "Log in successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    res.status(400).json({success: false, message: "Failed to log in"})
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ success: true, message: "Log out successfully" })
}

export const forgetPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({success: false, message: "User does not exist"})
    }

    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetPasswordToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetPasswordTokenExpiredAt = Date.now() + 60 * 60 * 1000;

    user.resetToken = resetToken
    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordTokenExpiredAt = resetPasswordTokenExpiredAt

    await user.save();
    await sendPasswordResetEmail(user.email, resetPasswordToken);

    res.status(200).json({
      success: true,
      message: "Forget password token sent successfully", 
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const resetPassword = async (req, res) => { 
  const { code, password } = req.body
  const { token } = req.params

  try {
    const user = await User.findOne({
      resetToken: token,
      resetPasswordToken: code,
      resetPasswordTokenExpiredAt: {$gt: Date.now()}
    })
    
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or Expired Reset Password Token"})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword
    user.resetToken = undefined
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiredAt = undefined
    await user.save()

    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Reset Password successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"})
  }
}

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(400).json({success: false, message: "user not found"})
    }
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (error) {
    return res.status(400).json({success: false, message: error.message})
  }
}
