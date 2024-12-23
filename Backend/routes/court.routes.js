import express from "express";

import { addCourt, getCourt } from "../controller/court.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/getCourt",protect, getCourt)
        .post('/addCourt',protect,addCourt)

export default router;
