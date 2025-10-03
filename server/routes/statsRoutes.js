import express from "express";
import { getAnalytics } from "../controllers/statsController.js";
import apiKeyAuth from "../middleware/ApiKeyAuth.js";

const router = express.Router();

console.log("📂 statsRoutes.js loaded");

router.get("/analytics", apiKeyAuth, (req, res, next) => {
  console.log("📡 /analytics route hit"); // debug
  next();
}, getAnalytics);

export default router;