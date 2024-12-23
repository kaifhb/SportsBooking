import express from "express";
// import { getCentres } from "../controller/centre.controllers.js";
import {
  getAllSports,
  getSportAtCentre,
  getDynamicPrice,
  addSport,
} from "../controller/sport.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllSports", getAllSports);
router.get("/getSportAtCentre",protect, getSportAtCentre);
router.get("/getDynamicPrice", getDynamicPrice)
      .post('/addSport',protect,addSport)

export default router;
