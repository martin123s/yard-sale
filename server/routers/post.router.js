import express from "express";
import { uploadPost, getPosts, deletePosts } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyImageSize } from "../middleware/verifyImageSize.js";


const router = express.Router();

router.get("/", verifyToken, getPosts)

router.post("/", verifyToken, verifyImageSize, uploadPost)

router.delete("/", verifyToken, deletePosts)



export default router;