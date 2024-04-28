/**
 * Authenticating routing
 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();

//Connect to db
mongoose.connect(process.env.uri).then(()=>{
    console.log("Connected to Mongodb")
}).catch((error)=>{
    console.error("Connecting to Mong faild");
});

//User schema
const user = require("../models/user");
//Registrera användare
router.post("/register", async (req, res)=>{
    try{
        const {username, password, email} = req.body;

        //Validation
        if(!username || !password || !email){
            return res.status(400).json({error: "Invalid input"});
        }

        //Successful user registration
        res.status(201).json({message: "User is created"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//logga in användare
router.post("/login", async (req, res)=>{
    try{
        const {username, password} = req.body;

        //Validation
        if(!username || !password){
            return res.status(400).json({error: "Invalid username/password"});
        }

        //Check credentials
        if(username === "Himo" && password === "Azo"){
            res.status(200).json({message: "logged in successfully"});
        }else{
            res.status(401).json({error: "Invalid username/password"});
        }
        
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;