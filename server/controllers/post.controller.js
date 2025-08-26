import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto'

import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { s3 } from "../utils/aws.s3.config.js"



const bucketName = process.env.BUCKET_NAME
const randomImageName = () => crypto.randomBytes(20).toString("hex")

export const uploadPost = async (req, res) => { 
  
  const formData = req.body

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    const today = new Date().toLocaleDateString()
    const theme = `${formData.title}_${today}`

    const unique = await Post.findOne({
      userId: req.userId,
      title: theme,
    });
    
    if (unique) {
      return res.status(400).json({success: false, message: "Title already exists, please change one"})
    }

    const uploadImages = req.files.map(async (file) => {
      // upload image aysnc
      const fileName = randomImageName()
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }
      const command = new PutObjectCommand(params)
      await s3.send(command)
      
      // return to the mongodb of the image data
      return {
        filename: fileName,
        originalName: file.originalname,
        path: fileName,
      }
    })

    const images = await Promise.all(uploadImages)
    formData.address = JSON.parse(formData.address)

    const newPosts = new Post({
      ...formData,
      userId: user._id,
      title: theme,
      images
    });

    await newPosts.save();

    res.status(200).json({
      success: true,
      message: "User post successful",
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const getPosts = async (req, res) => { 

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    const items = await Post.find()
    if (!items) {
      return res.status(400).json({success: false, message: "No any post found"})
    }

    await Promise.all(
      items.map( async (item) => {
        for (const img of item.images) {
          // get image url from s3
          const getObjectParams = {
            Bucket: bucketName,
            Key: img.filename,
          }
          const urlCommand = new GetObjectCommand(getObjectParams)
          const urlImage = await getSignedUrl(s3, urlCommand, { expiresIn: 3600 * 24 * 7 })
          img.path = urlImage
        }
      })
    )

    res.status(200).json({
      success: true,
      message: "Successfully find user posts",
      userId: req.userId,
      items
    })
    
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const deletePosts = async (req, res) => {
  const { deleteIds } = req.body
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({success: false, message: "User not found"})
    }

    for (const id of deleteIds) {
      const item = await Post.findById(id)
      if (!item) return res.status(400).json({success: false, message: `Can't find item ${id}`})

      for (const img of item.images) {
        const params = { Bucket: bucketName, Key: img.filename }
        const command = new DeleteObjectCommand(params)
        await s3.send(command)
      }
    }
    
    await Post.deleteMany({
      _id: { $in: deleteIds },
      userId: req.userId
    })

    res.status(200).json({
      success: true,
      message: "Successfully delete",
    })

  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

