import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import logRoutes from "./routes/logRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uptimeRoutes from "./routes/uptimeRoutes.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
connectDB();

// Routes
app.use("/api/tracer", logRoutes);
app.use("/api/controls", controlRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/uptime", uptimeRoutes);

console.log("📂 Mounting /api/stats routes...");
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
