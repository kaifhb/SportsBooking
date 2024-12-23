import Centre from "../model/Centres.js";
import asyncHandler from "express-async-handler";
const getCentres = async (req, res) => {
  try {
    // Use populate to get the sports details
    const data = await Centre.find()
    console.log(JSON.stringify(data, null, 2)); 
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error. Unable to retrieve centres." });
  }
};

const addCentre = async (req, res) => {
  try {
    const { name, location, priceFactor } = req.body;

    // Validate input
    if (!name || !location || priceFactor === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new Centre
    const newCentre = new Centre({
      name,
      location,
      priceFactor: priceFactor || 1.0, // Default to 1.0 if not provided
    });

    // Save to database
    await newCentre.save();

    // Send success response
    res.status(201).json({ message: "Centre added successfully.", centre: newCentre });
  } catch (error) {
    console.error("Error adding centre:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
export { getCentres,addCentre };
