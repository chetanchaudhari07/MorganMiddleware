const fs = require("fs")
const Validated = (req,res,next)=>{
 
    const { ID, Name, Rating, Description, Genre } = req.body;
    

    if (typeof ID !== 'number') {
        return res.status(400).json({ message: "invalid request body" });
    }
    if (typeof Name !== 'string') {
        return res.status(400).json({ message: "invalid request body" });
    }
    if (typeof Rating !== 'number') {
        return res.status(400).json({ message: "invalid request body" });
    }
    if (typeof Description !== 'string') {
        return res.status(400).json({ message: "invalid request body" });
    }
    if (typeof Genre !== 'string') {
        return res.status(400).json({ message: "invalid request body" });
    }
   
    next();

}


module.exports = Validated