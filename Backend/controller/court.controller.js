import Courts from "../model/Courts.js";
const getCourt = async(req,res)=>{
    try {
        const {sportId} = req.body;
        // console.log(req.body);
        
        // console.log(sportId);
        
        const data = await Courts.find({sport:sportId});

        // console.log(data);

        res.json(data);
        
    } catch (error) {
        console.log(error);
        res.json({message:"Failed to get courts",success:0});
        
    }
}
const addCourt = async (req, res) => {
  try {
    const { name, sport } = req.body;

    // Validate input
    if (!name || !sport) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // // Validate sportId as a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(sport)) {
    //   return res.status(400).json({ message: "Invalid sport ID." });
    // }

    // Create a new Court
    const newCourt = new Courts({
      name,
      sport,
    });

    // Save to database
    await newCourt.save();

    // Send success response
    res.status(201).json({ message: "Court added successfully.", court: newCourt });
  } catch (error) {
    console.error("Error adding court:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export {getCourt,addCourt}