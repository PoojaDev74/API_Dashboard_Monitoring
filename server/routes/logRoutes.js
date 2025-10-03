import express from "express";
import { getLogs } from "../controllers/logController.js";
import apiKeyAuth from "../middleware/ApiKeyAuth.js";
const router = express.Router();

router.get("/logs", apiKeyAuth, getLogs);

export default router;

