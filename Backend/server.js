import "./config/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";

import authRoutes from "./routes/auth.js";
import uploadRoute from "./routes/uploadRoute.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://excel-analysis-platform-tdkc.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight
app.options("*", cors());

// ✅ Root route (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Excel Analysis Platform Backend is Running 🚀");
});

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working" });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", uploadRoute);
app.use("/api", aiRoutes);

// ✅ Connect DB & Start Server
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
