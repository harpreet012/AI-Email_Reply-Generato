import mongoose from "mongoose";

const emailHistorySchema = new mongoose.Schema(
  {
    originalEmail: {
      type: String,
      required: [true, "Original email is required"],
      trim: true,
      maxlength: [10000, "Email content is too long"],
    },

    generatedReply: {
      type: String,
      required: [true, "Generated reply is required"],
      trim: true,
    },

    tone: {
      type: String,
      required: [true, "Tone is required"],
      enum: [
        "Professional",
        "Formal",
        "Friendly",
        "Concise",
        "Persuasive",
      ],
      default: "Professional",
    },

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    isTemplate: {
      type: Boolean,
      default: false,
    },

    copiedCount: {
      type: Number,
      default: 0,
    },

    regeneratedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

emailHistorySchema.index({ createdAt: -1 });

const EmailHistory = mongoose.model("EmailHistory", emailHistorySchema);

export default EmailHistory;