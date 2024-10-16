import express from "express";
import {protect} from "../middleware/authMiddleware.js"
import { getCentres } from "../controller/centre.controllers.js";

const router = express.Router();

router.get("/getCentres", protect,getCentres);


export default router;
