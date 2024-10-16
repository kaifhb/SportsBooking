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

export {getCourt}