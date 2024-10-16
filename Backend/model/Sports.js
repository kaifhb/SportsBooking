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
});

export default mongoose.model("Sport", SportSchema);
