import express from "express";
import { getTextAndCallAI } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/groq", getTextAndCallAI);

export default router;