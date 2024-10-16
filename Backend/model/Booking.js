// import mongoose from "mongoose";

// const BookingSchema = new mongoose.Schema({
//   centre: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Centre",
//     required: true,
//   },
//   sport: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Sport",
//     required: true,
//   },
//   court: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Court",
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   startTime: {
//     type: String, // Storing time in "HH:MM" format.
//     required: true,
//   },
//   endTime: {
//     type: String, // Automatically inferred from the startTime.
//     required: true,
//   },
//   customerName: {
//     type: String,
//     required: true,
//     ref: "User",
//   },
// });

// // Export the model using ES6 syntax
// export default mongoose.model("Booking", BookingSchema);



import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Court",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String, // Storing time in "HH:MM" format.
    required: true,
  },
  endTime: {
    type: String, // Automatically inferred from the startTime.
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the 'User' schema instead of customerName.
    required: true,
  },
});

BookingSchema.pre("validate", function (next) {
  // Automatically set endTime as 1 hour after startTime.
  const startTimeArray = this.startTime.split(":");
  const endHour = parseInt(startTimeArray[0]) + 1;
  this.endTime = `${endHour}:${startTimeArray[1]}`; // Use backticks for template literals
  next();
});

const booking = mongoose.model("Bookings", BookingSchema);

export default booking;