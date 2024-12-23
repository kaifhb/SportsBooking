import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport",
    required: true,
  },
  

});

export default mongoose.model("Court", CourtSchema);
