import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadMedia } from "../controllers/uploadController.js";

const router = express.Router();

// Upload single image/video
router.post("/", protect, upload.single("file"), uploadMedia);

export default router;