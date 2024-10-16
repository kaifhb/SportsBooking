import express from "express";
import { getAvailableSlots } from "../controller/schedule.controllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Define the route for fetching available slots
// Example Endpoint: GET /api/schedule/availableSlots?centre=<id>&sport=<id>&court=<id>&date=YYYY-MM-DD
router.post("/availableSlots", protect, getAvailableSlots);

export default router;
