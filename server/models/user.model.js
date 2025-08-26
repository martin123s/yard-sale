import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  isVerified: {
    type: Boolean, 
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiredAt: Date,
  resetToken:String, 
  resetPasswordToken: String, 
  resetPasswordTokenExpiredAt: Date,

}, { timestamps: true });

export const User = mongoose.model('User', userSchema);