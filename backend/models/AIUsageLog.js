import mongoose from "mongoose";

const aiUsageLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      default: "",
    },
    tokens: {
      type: Number,
      default: 0,
    },
    success: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for analytics
aiUsageLogSchema.index({ type: 1, createdAt: -1 });
aiUsageLogSchema.index({ success: 1 });

const AIUsageLog = mongoose.model("AIUsageLog", aiUsageLogSchema);

export default AIUsageLog;
