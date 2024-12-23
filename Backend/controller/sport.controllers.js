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

const addSport = async (req, res) => {
  try {
    const { name, basePrice, priceFactor, centre } = req.body;

    // Validate input
    if (!name || basePrice === undefined || !centre) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new Sport
    const newSport = new Sports({
      name,
      basePrice,
      priceFactor: priceFactor || 1.0, // Default to 1.0 if not provided
      centre,
    });

    // Save to database
    await newSport.save();

    // Send success response
    res.status(201).json({ message: "Sport added successfully.", sport: newSport });
  } catch (error) {
    console.error("Error adding sport:", error);
    res.status(500).json({ message: "Internal server error." });
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
    console.log(sports);
    
    res.json(sports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error. Unable to retrieve sports." });
  }
};

const getDynamicPrice = async(req,res) =>{
   const { sportId } = req.query; // Get centre_id from the query params
   const sport_id = sportId;

   try {
     // 1. Validate that the centre exists

  
     // 2. Find sports that belong to the specified centre
     const sports = await Sports.findById(sport_id).populate("centre");
     console.log(sports);
    const finalPrice  = sports.basePrice * sports.centre.priceFactor * sports.priceFactor
     res.json(finalPrice);
   } catch (error) {
     console.error(error);
     res
       .status(500)
       .json({ error: "Server error. Unable to retrieve sports." });
   }

}

export { getAllSports, getSportAtCentre,getDynamicPrice,addSport };
