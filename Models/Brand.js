const mongoose = require("mongoose")

const BrandShema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Name Must Required!!!"],
        unique:true
    }
})
const Brand = new mongoose.model("Brand",BrandShema)
module.exports = Brand