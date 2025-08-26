import express from "express";
import { getLikes, uploadLikes } from "../controllers/likes.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/", verifyToken, getLikes)

router.post("/", verifyToken, uploadLikes)


export default router;