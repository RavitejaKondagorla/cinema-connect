import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// ---------- Middleware ----------
app.use(express.json());
app.use(cors());

// ---------- Routes ----------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// ---------- Test route ----------
app.get("/", (req, res) => {
  res.send("Cinema-Connect Backend is running 🚀");
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5000;

// ✅ Connect DB BEFORE listening
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});