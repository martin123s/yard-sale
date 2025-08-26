import express from "express";
import {signin, signup, logout, verifyEmail, forgetPassword, resetPassword, checkAuth} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/logout", logout)

router.post("/verify-email", verifyEmail)

router.post("/forget-password", forgetPassword)

router.post("/reset-password/:token", resetPassword)


export default router;