const mongoose = require("mongoose")

const SubcategoryShema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Name Must Required!!!"],
        unique:true
    }
})
const Subcategory = new mongoose.model("Subcategory",SubcategoryShema)
module.exports = Subcategory