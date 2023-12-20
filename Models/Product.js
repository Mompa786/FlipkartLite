const mongoose = require("mongoose")

const ProductShema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Name Must Required!!!"]
    },
    maincategory : {
        type:String,
        required:[true,"Maincategory Must Required!!!"]
    },
    subcategory : {
        type:String,
        required:[true,"Subcategory Must Required!!!"]
    },
    brand : {
        type:String,
        required:[true,"Brand Must Required!!!"]
    },
    color : {
        type:String,
        required:[true,"Color Must Required!!!"]
    },
    size : {
        type:String,
        required:[true,]
    },
    baseprice : {
        type:Number,
        required:[true,"Base Price Must Required!!!"]
    },
    discount : {
        type:Number,
        default:0
    },
    finalprice : {
        type:Number,
        required:[true,"Final Price Must Required!!!"]
    },
    stock : {
        type:String,
        default:"In Stock"
    },
    description : {
        type:String,
        default:"This is Sample Product"
    },
    pic1 : {
        type:String,
        required:[true,"Pic1 Must Required!!!"]
    },
    pic2 : {
        type:String,
        default:""
    },
    pic3 : {
        type:String,
        default:""
    },
    pic4 : {
        type:String,
        default:""
    }
})
const Product = new mongoose.model("Product",ProductShema)
module.exports = Product