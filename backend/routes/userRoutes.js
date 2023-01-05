import express from "express";
import { getAiScript } from "../controllers/aiScriptController.js";
const router = express.Router();
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser)
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/ai/:topic").get(getAiScript);


export default router;
