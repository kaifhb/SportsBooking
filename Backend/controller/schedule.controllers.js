import mongoose from "mongoose";
import Centre from "../model/Centres.js"
import Sport from "../model/Sports.js"
import Court from "../model/Courts.js"
import Booking from "../model/Booking.js"
import User from "../model/Users.js"

export const getAvailableSlots = async (req, res) => {
    try {
      const { centreId, sportId, selectedCourt, selectedDate } = req.body;
      const { centre, sport, court, date } = {
        centre: centreId,
        sport: sportId,
        court: selectedCourt,
        date: selectedDate,
      };

        // console.log("yyy",{ centre, sport, court, date });
      // *1. Validate Input Parameters*
      if (!centre || !sport || !court || !date) {
        return res.status(400).json({ message: "Missing required query parameters: centre, sport, court, date." });
      }
  
      // Validate ObjectId formats
      if (!mongoose.Types.ObjectId.isValid(centre)) {
        return res.status(400).json({ message: "Invalid Centre ID format." });
      }
      if (!mongoose.Types.ObjectId.isValid(sport)) {
        return res.status(400).json({ message: "Invalid Sport ID format." });
      }
      if (!mongoose.Types.ObjectId.isValid(court)) {
        return res.status(400).json({ message: "Invalid Court ID format." });
      }
  
      // Validate Date
      const bookingDate = new Date(date);
      if (isNaN(bookingDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }
  
      // *2. Verify Relationships*
  
      // Check if Centre exists
      const foundCentre = await Centre.findById(centre);
      if (!foundCentre) {
        return res.status(404).json({ message: "Centre not found." });
      }
  
      // Check if Sport exists and belongs to Centre
      const foundSport = await Sport.findOne({ _id: sport, centre: centre });
      if (!foundSport) {
        return res.status(404).json({ message: "Sport not found in the specified Centre." });
      }
  
      // Check if Court exists and belongs to Sport
      const foundCourt = await Court.findOne({ _id: court, sport: sport });
      if (!foundCourt) {
        return res.status(404).json({ message: "Court not found under the specified Sport." });
      }
  
      // *3. Generate Time Slots*
      const generateTimeSlots = (start = "08:00", end = "20:00", interval = 60) => {
        const slots = [];
        let [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);
  
        while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
          const slotStart = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
          let nextHour = startHour;
          let nextMinute = startMinute + interval;
          if (nextMinute >= 60) {
            nextMinute -= 60;
            nextHour += 1;
          }
          const slotEnd = `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`;
          slots.push({ startTime: slotStart, endTime: slotEnd });
          startHour = nextHour;
          startMinute = nextMinute;
        }
  
        return slots;
      };
  
      const timeSlots = generateTimeSlots();
  
      // *4. Check Existing Bookings*
  
      // Define start and end of the day for querying
      const startOfDay = new Date(bookingDate);
      startOfDay.setHours(0, 0, 0, 0);
  
      const endOfDay = new Date(bookingDate);
      endOfDay.setHours(23, 59, 59, 999);
  
      // Fetch bookings for the specified court and date
      const existingBookings = await Booking.find({
        centre: centre,
        sport: sport,
        court: court,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
  
      // Extract booked start times
      const bookedStartTimes = existingBookings.map(booking => booking.startTime);
  
      // *5. Determine Available Slots*
      const availableSlots = timeSlots.filter(slot => !bookedStartTimes.includes(slot.startTime));
  
      // *6. Respond with Available Slots*
      return res.status(200).json({
        success: true,
        date: date,
        centre: centre,
        sport: sport,
        court: court,
        availableSlots: availableSlots,
      });
  
    } catch (error) {
      console.error("Error in getAvailableSlots:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };