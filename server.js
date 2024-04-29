const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

//Routing
app.use("/api", authRoutes);

//Protected routes
app.get("/api/protected", authenticatetoken, (req, res)=>{
    res.json({message: "protected route"});
})

//Validate token
function authenticatetoken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null){
        res.status(401).json({message: " Not authorized for this route - token is missing"});
    }

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