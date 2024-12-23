import express from "express";
import {protect} from "../middleware/authMiddleware.js"
import { getCentres,addCentre } from "../controller/centre.controllers.js";

const router = express.Router();

router.get("/getCentres", protect, getCentres)
.post("/addCentre",protect,addCentre)

export default router;
