import express from "express";
import { getControls, updateControl } from "../controllers/controlController.js";
const router = express.Router();

router.get("/", getControls);
router.put("/:apiName", updateControl);

export default router;
