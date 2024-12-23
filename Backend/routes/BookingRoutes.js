import express from "express";

import { createBooking } from "../controller/Booking.controller.js";
import { protect } from "../middleware/authMiddleware.js";
 // Assuming the getBookings controller is in the same directory

const router = express.Router();

// Route to create a new booking
// POST /api/bookings
router.post("/createBooking", protect,createBooking);

// Route to get bookings for a specific center, sport, and date
// GET /api/bookings?centre_id=<centre_id>&sport_id=<sport_id>&date=<date>
// router.get("/", getBookings);

export default router;
