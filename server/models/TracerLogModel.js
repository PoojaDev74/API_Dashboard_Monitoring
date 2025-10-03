import mongoose from "mongoose";

const TracerLogSchema = new mongoose.Schema({
  traceId: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  apiName: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  responseTimeMs: {
    type: Number,
    required: true,
  },
  logs: [
    {
      timestamp: { type: Date },
      type: { type: String },
      method: { type: String },
      apiName: { type: String },
      message: { type: String },
    },
  ],
});

export default mongoose.model("TracerLog", TracerLogSchema);
