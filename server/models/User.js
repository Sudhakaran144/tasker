const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    }
})

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ password: 1 }, { unique: true });

const UserModel = mongoose.model("register",UserSchema)
module.exports = UserModel