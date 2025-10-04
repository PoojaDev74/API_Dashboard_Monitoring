import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import logRoutes from "./routes/logRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import uptimeRoutes from "./routes/uptimeRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5000",
  "https://apidashbord.netlify.app"   
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "x-api-key"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api/tracer", tracerRoutes);
app.use("/api/controls", controlRoutes);
app.use("/api/stats", analyticsRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/uptime", uptimeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
