const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        uniqe: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hash password
userSchema.pre("save", async function(next){
    try{
        if(this.isNew || this.isModified("password")){
            const hashed = await bcrypt.hash(this.password, 10);
            this.password = hashed;
            next();
        }
    }catch(error){
        next(error);
    }
});

// Register user
