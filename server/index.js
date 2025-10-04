import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import logRoutes from "./routes/logRoutes.js";
import controlRoutes from "./routes/controlRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uptimeRoutes from "./routes/uptimeRoutes.js";

const app = express();

app.use(express.json());
connectDB();

const allowedOrigins = [
  "https://dashboardmonitoringapi.netlify.app",
  "http://localhost:10000",
  "http://localhost:5000",
  "http://localhost:3000"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "x-api-key"]
};

app.use(cors(corsOptions));


// Routes
app.use("/api/tracer", logRoutes);
app.use("/api/controls", controlRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/uptime", uptimeRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
