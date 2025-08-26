import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: String, 
  title: String,
  description: String,
  address: {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  }, 
  startDate: String,
  price: String,
  types: {
    type: [String],
    default: [],
  },
  conditions: {
    type: [String],
    default: [],
  },
  images: [{
    filename: String,
    originalName: String,
    path: String,
  }],
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);


  