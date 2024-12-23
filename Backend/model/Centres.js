import mongoose from "mongoose";
import Sports from "./Sports.js";

const CentreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  priceFactor: {
    type: Number, // Multiplier for base prices across all courts for this sport.
    default: 1.0,
  },
});

export default mongoose.model("Centre", CentreSchema);
