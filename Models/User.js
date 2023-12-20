const mongoose = require("mongoose")

const UserShema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Name Must Required!!!"]
    },
    username : {
        type:String,
        required:[true,"User Name Must Required!!!"],
        unique:true
    },
    email : {
        type:String,
        required:[true,"Email Must Required!!!"]
    },
    phone : {
        type:String,
        required:[true,"Phone Must Required!!!"]
    },
    password:{
        type:String,
        required:[true,"Password Must Required!!!"]
    },
    addressline1 : {
        type:String
    },
    addressline2 : {
        type:String
    },
    addressline3 : {
        type:String
    },
    pin : {
        type:String
    },
    city : {
        type:String
    },
    state : {
        type:String
    },
    pic : {
        type:String
    },
    role : {
        type:String,
        default:"Buyer"
    },
    otp:{
        type:Number
    }
})
const User = new mongoose.model("User",UserShema)
module.exports = User