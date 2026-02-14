import express from "express";
import { scoreResume } from "../controllers/ai.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/score-resume", isAuthenticated, singleUpload, scoreResume);

export default router;
