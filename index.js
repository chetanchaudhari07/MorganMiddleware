const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const Validated = require("./validatedmiddleware");

const server = express();

const Port = 8786;

server.use(express.json());

// morgan(':method :url :status :res[content-length] - :response-time ms')

const accesslog = fs.createWriteStream("./access.log",{flags : "a"});

server.use(morgan("combined",{stream:accesslog}));

server.get("/Get-user",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    console.log("WELCOME")
    res.json({message:"welcome", data: data.user})
});


server.post("/Add-user",Validated,(req,res)=>{
    try {
        const NewUser = req.body;
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));


    data.user.push(NewUser);
    fs.writeFileSync("./db.json",JSON.stringify(data),"utf-8");
    console.log("user Added");
    res.json({message: "data received", data: data.user})
    } catch (error) {
        console.log("error");
        res.status(500).json({message:"internal server error"})
        
    }

});


server.put("/Update-user/:id",Validated,(req,res)=>{
    try {
        const userId = parseInt(req.params.id,10);
    const updatedUser = req.body;
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
    const userIndex = data.user.findIndex(user => user.ID === userId);

    if(userIndex===-1){
        return res.status(404).json({message:"User not found"});

    }

    data.user[userIndex]={...data.user[userIndex],...updatedUser};
    fs.writeFileSync("./db.json",JSON.stringify(data),"utf-8");

    console.log("user update");
    res.json({message:"user update",data:data.user});
    } catch (error) {
        console.log("error");
        res.status(500).json({message:"error"})
    }



});

server.delete("/Delete-user/:id",(req,res)=>{
    try {
     const userID = parseInt(req.params.id,10);
     const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
 
     const userIndex = data.user.findIndex(user => user.ID===userID);
 
     if(userIndex===-1){
         return res.status(404).json({message:"user not found"});
 
     }
     data.user.splice(userIndex,1);
     fs.writeFileSync("./db.json",JSON.stringify(data),"utf-8");
 
     console.log("user Deleted");
     res.json({message:"user deleted",data:data.user});
    } catch (error) {
        console.log("error");
        res.status(500).json({message:"error"})
    }
 
 });




























server.listen(Port,()=>{
    console.log("server is running");
});

























