import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import connectDB from "./config/db.js";
import aiRoutes from "./routes/ai.routes.js";
import { isConfigured } from "./services/gemini.js";

dotenv.config();

// Connect MongoDB
connectDB();

if (!isConfigured) {
  console.warn(
    "\n⚠ GEMINI_API_KEY is not set. Add it to a .env file before generating replies.\n"
  );
}

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.send("🚀 AI Email Reply Generator API Running");
});

app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});