const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"please enter name"]
    },
    email:{
        type:String,
        require:[true,"please enter email"]
    },
    password:{
        type:String,
        require:[true,"please enter password"]
    }
})

const Admin = mongoose.model("admin",adminSchema);
module.exports= Admin;