import express from "express";

import { getCourt } from "../controller/court.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/getCourt",protect, getCourt);

export default router;
