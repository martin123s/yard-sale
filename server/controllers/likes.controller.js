import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Likes } from "../models/likes.model.js";



export const uploadLikes = async (req, res) => { 
  const { likes } = req.body
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    if (!likes || typeof likes !== 'object') {
      return res.status(400).json({ success: false, message: "Invalid likes format" });
    }

    const existUser = await Likes.findOne({ userId: req.userId })

    if (existUser) {
      existUser.likes = likes
      await existUser.save()
    } else {
      const newLikes = new Likes({
        likes,
        userId: user._id,
      })
      await newLikes.save();
    }

    res.status(200).json({
      success: true,
      message: "User likes saved",
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    const likes = await Likes.findOne({userId: req.userId})
    if (!likes) {
      return res.status(400).json({success: false, message: "You don't have any like yet"})
    }

    res.status(200).json({
      success: true,
      message: "Successfully find user likes",
      userId: req.userId,
      likes
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}