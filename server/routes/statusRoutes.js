import express from "express";
import { getApiStatus } from "../controllers/statusController.js";
import apiKeyAuth from "../middleware/ApiKeyAuth.js";
const router = express.Router();

router.get("/", apiKeyAuth, getApiStatus);

export default router;
