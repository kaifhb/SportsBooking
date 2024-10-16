import Sports from "../model/Sports.js";
import asyncHandler from "express-async-handler";
import Centres from "../model/Centres.js";
const getAllSports = async (req, res) => {
  try {
    // Use populate to get the sports details
    const data = await Sports.find()

   // console.log(JSON.stringify(data, null, 2)); // This will now include the populated sports data
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error. Unable to retrieve centres." });
  }
};

const getSportAtCentre = async(req,res)=>{

  const { centreId } = req.query; // Get centre_id from the query params
  const centre_id = centreId
  
  
  try {
    // 1. Validate that the centre exists
    const centre = await Centres.findById(centre_id);
    // console.log("jjj",centre);
    const centreName = centre?.name;
    if (!centre) {
      return res.status(404).json({ error: "Centre not found" });
    }
    
    // 2. Find sports that belong to the specified centre
    const sports = await Sports.find({ centre: centre_id })
                                .populate({
                                  path:"centre"
                                })
                                .populate("courts")
    
    // 3. Respond with the filtered sports
    console.log(sports);
    
    res.json(sports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Unable to retrieve sports." });
  }
};

export { getAllSports, getSportAtCentre };
