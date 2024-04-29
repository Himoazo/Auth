const express = require("express");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

//Routing
app.use("/api", authRoutes);

//Starting app
app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
});