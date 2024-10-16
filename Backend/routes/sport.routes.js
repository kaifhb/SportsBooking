import express from "express";
// import { getCentres } from "../controller/centre.controllers.js";
import { getAllSports , getSportAtCentre } from "../controller/sport.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllSports", getAllSports);
router.get("/getSportAtCentre",protect, getSportAtCentre);

export default router;
