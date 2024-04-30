const mongoose = require("mongoose");


//Schema
const expSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Organisation måste fyllas i"]
    },
    jobtitle: {
        type: String,
        required: [true, "Jobbtitel måste fyllas i"]
    },
    location: {
        type: String,
        required: [true, "Plats måste vara ifylld"]
    },
    startdate: {
        type: Date,
        required: [true, "Startdatum måste anges"]
    },
    enddate: {
        type: Date,
        required: false
    }  
});

const workexperience = mongoose.model("workexperience", expSchema);

module.exports = workexperience;