const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT;
const cors = require("cors");
// Accept requests from other origins
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

//Read cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose.createConnection(process.env.uri2).asPromise(); //Users collection
const workexperience = require("./models/exp.js");

//Routing
app.use("/api", authRoutes);

//GET request
app.get("/api/workexperiences", async(req, res)=>{
    try{
        let result = await workexperience.find({});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Hantera POST requests
app.post("/api/workexperiences", authenticatetoken, async(req, res)=>{
    try{
        let result = await workexperience.create(req.body);
        return res.json(result);
    }catch(error){
        return res.status(400).json(error);
    }
});

//Hantera DELETE requests
app.delete("/api/workexperiences/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;

    try{
        let result = await workexperience.deleteOne({_id: id});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Hantera PUT requests
app.put("/api/workexperiences/:id", authenticatetoken, async(req, res)=>{
    let id = req.params.id;
    let exp = req.body;
    if(exp.enddate == "Pågående" || exp.enddate == ""){
        exp.enddate = null;
    }
    try{
        let result = await workexperience.updateOne({_id: id}, {$set: exp});
       
        return res.json(result);
    }catch(error){
        return res.status(500).json(error);
    }
});

//Validate token
function authenticatetoken(req, res, next){
    /* const token = req.cookies.token; */ //läs in cookie som innehåller jwt token
    const authHeader = req.headers['authorization'];
    /* const token = authHeader && authHeader.split(' ')[1]; */
    const token = authHeader.split(' ')[1];
    
    console.log(token);
    if(token == null){
        res.status(401).json({message: " Not authorized for this route - token is missing"});
    }
    //Verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username)=>{
        if(err){
            return res.status(403).json({message: "Invalid JWT"});
        }
        
        req.username = username;
        next();
    });
}
//Starting app
app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
});