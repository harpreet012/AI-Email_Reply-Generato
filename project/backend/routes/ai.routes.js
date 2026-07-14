import express from "express";
import { TONES } from "../services/gemini.js";

import {
  generateEmailReply,
  getDashboardStats,
  getAllHistory,
  deleteHistory,
  clearHistory,
  saveAsTemplate,
  getTemplates,
  increaseCopyCount,
} from "../controllers/email.controller.js";

const router = express.Router();

/* ==========================================================
   AI Tones
========================================================== */
router.get("/tones", (req, res) => {
  res.status(200).json({
    success: true,
    tones: TONES,
  });
});

/* ==========================================================
   Generate AI Reply
========================================================== */
router.post("/generate", generateEmailReply);

/* ==========================================================
   Dashboard
========================================================== */
router.get("/dashboard", getDashboardStats);

/* ==========================================================
   History
========================================================== */

// Get all history (supports search & filter)
router.get("/history", getAllHistory);

// Delete entire history
router.delete("/history", clearHistory);

// Delete single reply
router.delete("/history/:id", deleteHistory);

// Increase copy count
router.patch("/history/copy/:id", increaseCopyCount);

/* ==========================================================
   Templates
========================================================== */

// Save reply as template
router.patch("/template/:id", saveAsTemplate);

// Get all saved templates
router.get("/templates", getTemplates);

export default router;