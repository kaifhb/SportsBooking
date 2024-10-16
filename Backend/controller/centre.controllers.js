import Centre from "../model/Centres.js";
import asyncHandler from "express-async-handler";
const getCentres = async (req, res) => {
  try {
    // Use populate to get the sports details
    const data = await Centre.find()

    
    

    console.log(JSON.stringify(data, null, 2)); // This will now include the populated sports data
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error. Unable to retrieve centres." });
  }
};

export { getCentres };
