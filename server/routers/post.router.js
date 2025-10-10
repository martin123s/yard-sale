import express from "express";
import { uploadPost, getPosts, deletePosts } from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyImageSize } from "../middleware/verifyImageSize.js";
import { clearCache } from "../utils/redisCleaner.js";
import { cache } from "../middleware/cache.js";


const router = express.Router();

router.get("/", verifyToken, cache('yardsales'), getPosts)

router.post("/", verifyToken, verifyImageSize, uploadPost)

router.delete("/", verifyToken, deletePosts)



export default router;