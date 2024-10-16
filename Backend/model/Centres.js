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
    
});

export default mongoose.model("Centre", CentreSchema);
