import express from "express";
import { getUptime } from "../controllers/uptimeController.js";
import apiKeyAuth from "../middleware/ApiKeyAuth.js";
const router = express.Router();

router.get("/", apiKeyAuth, getUptime);

export default router;
