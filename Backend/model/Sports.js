import mongoose from "mongoose";

const SportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  courts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
    },
  ],
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },

  priceFactor: {
    type: Number,
    default: 1.0,
  },
  

  basePrice: {
    type: Number, // Base price for the court.
    required: true,
  },
});

export default mongoose.model("Sport", SportSchema);
