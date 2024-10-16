// import Centre from "../model/Centres.js";
// import Sport from "../model/Sports.js";
// import Court from "../model/Courts.js";
// import Booking from "../model/Booking.js";

// import mongoose from "mongoose";
// // Helper function to add 60 minutes to a given time
// const addMinutesToTime = (time, minutesToAdd) => {
//   const [hours, minutes] = time.split(":").map(Number);
//   const date = new Date();
//   date.setHours(hours);
//   date.setMinutes(minutes + minutesToAdd);
//   const newHours = String(date.getHours()).padStart(2, "0");
//   const newMinutes = String(date.getMinutes()).padStart(2, "0");
//   return `${newHours}:${newMinutes}`;
// };

//  const createBooking = async (req, res) => {
//   const { centre_id, sport_id, court_id, customer_name, date, startTime } =
//     req.body;
//  ////   console.log(typeof centre_id)
//     //console.log( centre_id)
//   try {
//     // 1. Check if the centre exists
    
//     const centre = await Centre.findById(centre_id);
//   // console.log("new centre",centre);
//     if (!centre) {
//       return res.status(404).json({ error: "Centre not found" , centre});
//     }

//     // 2. Check if the sport exists in the given centre
//     const sport = await Sport.findOne({ _id: sport_id, centre: centre_id });
//     if (!sport) {
//       return res.status(404).json({ error: "Sport not found in this centre"});
//     }

//     // 3. Check if the court exists for the sport
//     const court = await Court.findOne({ _id: court_id, sport: sport_id });
//     if (!court) {
//       return res
//         .status(404)
//         .json({ error: "Court not found for the selected sport" });
//     }

//     // 4. Calculate endTime based on startTime + 60 minutes
//     const endTime = addMinutesToTime(startTime, 60);

//     // 5. Check if the requested time slot is already booked (overlapping check)
//     const existingBooking = await Booking.findOne({
//       court: court_id,
//       date: new Date(date),
//       $or: [
//         { startTime: { $lt: endTime, $gte: startTime } }, // Overlaps with start
//         { endTime: { $gt: startTime, $lte: endTime } }, // Overlaps with end
//         { startTime: { $lte: startTime }, endTime: { $gte: endTime } }, // Fully overlapping
//       ],
//     });

//     if (existingBooking) {
//       return res
//         .status(400)
//         .json({
//           error: "This time slot is already booked for the selected court",
//         });
//     }

//     // 6. Create the booking if the slot is available
//     const newBooking = new Booking({
//       centre: centre_id,
//       sport: sport_id,
//       court: court_id,
//       date: new Date(date),
//       startTime: startTime,
//       endTime: endTime,
//       customerName: customer_name,
//     });

//     await newBooking.save();

//     return res.status(201).json({
//       message: "Booking created successfully",
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Server error. Unable to create booking." });
//   }
// };



//  const getBookings = async (req, res) => {
//    const { centre_id, sport_id, date } = req.query; // Get the center, sport, and date from query params

//    try {
//      // 1. Check if the centre exists
//      const centre = await Centre.findById(centre_id);
//      if (!centre) {
//        return res.status(404).json({ error: "Centre not found" });
//      }

//      // 2. Check if the sport exists in the given centre
//      const sport = await Sport.findOne({ _id: sport_id, centre: centre_id });
//      if (!sport) {
//        return res.status(404).json({ error: "Sport not found in this centre" });
//      }

//      // Create the start and end of the day for querying the entire date
//  //    console.log(date, "hh");

//      // Manually parse the date string and set UTC time
//      let startOfDay = new Date(
//        Date.UTC(
//          new Date(date).getFullYear(),
//          new Date(date).getMonth(),
//          new Date(date).getDate(),
//          0,
//          0,
//          0,
//          0
//        )
//      );

//      let endOfDay = new Date(
//        Date.UTC(
//          new Date(date).getFullYear(),
//          new Date(date).getMonth(),
//          new Date(date).getDate(),
//          23,
//          59,
//          59,
//          999
//        )
//      );

//      startOfDay = startOfDay.toISOString();
//      endOfDay = endOfDay.toISOString();
//   //   console.log("star", startOfDay);
//    //  console.log("end", endOfDay);

//      // 3. Find all bookings for the specific date range and sport
//      const bookings = await Booking.find({
//        centre: centre_id,
//        sport: sport_id,
//        date: {
//          $gte: startOfDay, // Greater than or equal to start of the day
//          $lt: endOfDay, // Less than the end of the day
//        },
//      })
//        .populate("court")
//        .exec();

//      // 4. Return the bookings in the response
//      return res.status(200).json({
//        message: "Bookings retrieved successfully",
//        bookings: bookings,
//      });
//    } catch (error) {
//      console.error(error);
//      return res
//        .status(500)
//        .json({ error: "Server error. Unable to retrieve bookings." });
//    }
//  };
// export {
//   createBooking,
//   getBookings,
// };

////////////////////////


// controllers/bookingController.js

import Booking from '../model/Booking.js';
import Centre from '../model/Centres.js';
import Sport from '../model/Sports.js';
import Court from '../model/Courts.js';
import User from '../model/Users.js'
import mongoose from 'mongoose';

/**
 * @desc    Create a new booking
 * @route   POST /api/booking/createBooking
 * @access  Protected
 */
const createBooking = async (req, res) => {
    try {
        const { centre, sport, court, date, startTime } = req.body;
        // console.log(typeof centre)
        // console.log(typeof court)
        // console.log(req.body);
        
        // Validate input

        if (!centre || !sport || !court || !date || !startTime) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(centre)) {
            return res.status(400).json({ success: false, message: "Invalid centre ID." });
        }
        if (!mongoose.Types.ObjectId.isValid(sport)) {
            return res.status(400).json({ success: false, message: "Invalid sport ID." });
        }
        if (!mongoose.Types.ObjectId.isValid(court)) {
            return res.status(400).json({ success: false, message: "Invalid court ID." });
        }

        // Validate date
        const bookingDate = new Date(date);
        if (isNaN(bookingDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format." });
        }

        // Validate startTime format (HH:MM)
        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(startTime)) {
            return res.status(400).json({ success: false, message: "Invalid startTime format. Use HH:MM." });
        }

        // Check if Centre exists
        const centreExists = await Centre.findById(centre);
        if (!centreExists) {
            return res.status(404).json({ success: false, message: "Centre not found." });
        }

        // Check if Sport exists and belongs to the Centre
        const sportExists = await Sport.findOne({ _id: sport, centre: centre });
        if (!sportExists) {
            return res.status(404).json({ success: false, message: "Sport not found in the specified centre." });
        }

        // Check if Court exists and belongs to the Sport and Centre
        const courtExists = await Court.findById(court);
        if (!courtExists) {
            return res.status(404).json({ success: false, message: "Court not found for the specified sport and centre." });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({
            centre,
            sport,
            court,
            date: bookingDate,
            startTime
        });

        if (existingBooking) {
            return res.status(409).json({ success: false, message: "The selected slot is already booked." });
        }

        // Create the booking
        const newBooking = new Booking({
            centre,
            sport,
            court,
            date: bookingDate,
            startTime,
            user: req?.user?._id
        });

        const savedBooking = await newBooking.save();

        // Populate references for response
        const populatedBooking = await Booking.findById(savedBooking?._id)
              // .populate('centre')
              // .populate('sport')
              // .populate('court')
              // .populate('user');
              
        res.status(201).json({
            success: true,
            message: "Booking created successfully.",
            booking: populatedBooking
        });

    } catch (error) {
        console.error("Error in createBooking:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

export { createBooking };