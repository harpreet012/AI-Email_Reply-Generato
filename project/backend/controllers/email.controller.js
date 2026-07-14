import EmailHistory from "../models/EmailHistory.js";
import { generateReply } from "../services/gemini.js";

/* ==========================================================
   Generate AI Email Reply
========================================================== */

export const generateEmailReply = async (req, res) => {
  try {
    const {
      email,
      tone = "Professional",
      includeSubject = false,
    } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide the email content.",
      });
    }

    // Generate AI Reply
    const result = await generateReply(
      email.trim(),
      tone,
      includeSubject
    );

    // Save to MongoDB
    const history = await EmailHistory.create({
      originalEmail: email.trim(),
      generatedReply: result.reply,
      subject: result.subject,
      tone,
    });

    return res.status(201).json({
      success: true,
      message: "Reply generated successfully.",
      reply: result.reply,
      subject: result.subject,
      history,
    });

  } catch (error) {
    console.error("Generate Reply Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate email reply.",
    });
  }
};

/* ==========================================================
   Get Email History
========================================================== */

export const getAllHistory = async (req, res) => {
  try {
    const { search = "", tone = "All" } = req.query;

    let query = {};

    // Search in original email, generated reply and subject
    if (search) {
      query.$or = [
        {
          originalEmail: {
            $regex: search,
            $options: "i",
          },
        },
        {
          generatedReply: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by tone
    if (tone !== "All") {
      query.tone = tone;
    }

    const history = await EmailHistory.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });

  } catch (error) {

    console.error("History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch email history.",
    });

  }
};


/* ==========================================================
   Delete History
========================================================== */

export const deleteHistory = async (req, res) => {
  try {

    const { id } = req.params;

    const history = await EmailHistory.findById(id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found.",
      });
    }

    await EmailHistory.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "History deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete history.",
    });

  }
};

/* ==========================================================
   Save Reply As Template
========================================================== */

export const saveAsTemplate = async (req, res) => {
  try {

    const { id } = req.params;

    const history = await EmailHistory.findById(id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Reply not found.",
      });
    }

    history.isTemplate = true;

    await history.save();

    return res.status(200).json({
      success: true,
      message: "Reply saved as template.",
      data: history,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to save template.",
    });

  }
};

/* ==========================================================
   Get Saved Templates
========================================================== */

export const getTemplates = async (req, res) => {
  try {

    const templates = await EmailHistory.find({
      isTemplate: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch templates.",
    });

  }
};

/* ==========================================================
   Increase Copy Count
========================================================== */

export const increaseCopyCount = async (req, res) => {
  try {

    const { id } = req.params;

    const history = await EmailHistory.findById(id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Reply not found.",
      });
    }

    history.copiedCount += 1;

    await history.save();

    return res.status(200).json({
      success: true,
      copiedCount: history.copiedCount,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to update copy count.",
    });

  }
};

/* ==========================================================
   Clear Entire History
========================================================== */

export const clearHistory = async (req, res) => {
  try {

    await EmailHistory.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "History cleared successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to clear history.",
    });

  }
};
/* ==========================================================
   Dashboard Statistics
========================================================== */

export const getDashboardStats = async (req, res) => {
  try {
    const totalReplies = await EmailHistory.countDocuments();

    const totalTemplates = await EmailHistory.countDocuments({
      isTemplate: true,
    });

    const latestReply = await EmailHistory.findOne().sort({
      createdAt: -1,
    });

    const recentActivity = await EmailHistory.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const toneStats = await EmailHistory.aggregate([
      {
        $group: {
          _id: "$tone",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalReplies,
        totalTemplates,
        latestReply,
        recentActivity,

        toneStats: toneStats.map((item) => ({
          tone: item._id,
          count: item.count,
        })),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch dashboard.",
    });
  }
};