import mongoose from "mongoose";

const ControlSchema = new mongoose.Schema({
  apiName: { type: String, required: true, unique: true },
  startDate: { type: Date, required: true },
  enabled: { type: Boolean, default: true },
  tracer: { type: Boolean, default: true },
  limitEnabled: { type: Boolean, default: false },
  requestLimit: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  scheduleEnabled: { type: Boolean, default: false },
  startTime: String,
  endTime: String,
});

export default mongoose.model("Control", ControlSchema);
