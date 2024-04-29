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
userSchema.statics.register = async function(username, password){
    try{
        const user = this({username, password});
        await user.save;
        return user;
    }catch(error){
        throw(error);
    }
}

//Compare hashed password
userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password);
    }catch(error){
        throw error;
    }
}

//Login user
userSchema.statics.login = async function(username, password){
    try{
        const user= await this.findOne({username});

        if(!user){
            throw new Error("Incorrect username/passowrd");
        }

        const matchedPass = await user.comparePassword(password);

        //Password not matched
        if(!matchedPass){
            throw new Error("Incorrect username/passowrd");
        }

        //Matched
        return user;

    }catch(error){
        throw error;
    }
}

const user = mongoose.model("user", userSchema);
module.exports = user;