import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  likes: {
    type: Map,
    of: Boolean,
    default: {}
  }

}, { timestamps: true });

export const Likes = mongoose.model('Likes', likeSchema);