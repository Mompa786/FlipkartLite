const Product = require("../Models/Product")
const fs = require("fs")

async function createProduct(req, res) {
    try {
        var data = new Product(req.body)
        try{
            data.pic1 = req.files.pic1[0].filename
        }catch(error){}
        try{
            data.pic2 = req.files.pic2[0].filename
        }catch(error){}
        try{
            data.pic3 = req.files.pic3[0].filename
        }catch(error){}
        try{
            data.pic4 = req.files.pic4[0].filename
        }catch(error){}
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    } catch (error) {
        // console.log(error);
        if (error.errors.name)
            res.send({ result: "Fail", message: error.errors.name.message })
        else if (error.errors.maincategory)
            res.send({ result: "Fail", message: error.errors.maincategory.message })
        else if (error.errors.subcategory)
            res.send({ result: "Fail", message: error.errors.subcategory.message })
        else if (error.errors.brand)
            res.send({ result: "Fail", message: error.errors.brand.message })
        else if (error.errors.color)
            res.send({ result: "Fail", message: error.errors.color.message })
        else if (error.errors.size)
            res.send({ result: "Fail", message: error.errors.size.message })
        else if (error.errors.baseprice)
            res.send({ result: "Fail", message: error.errors.baseprice.message })
        else if (error.errors.finalprice)
            res.send({ result: "Fail", message: error.errors.finalprice.message })
        else if (error.errors.pic1)
            res.send({ result: "Fail", message: error.errors.pic1.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function getAllProduct(req, res) {
    try {
        var data = await Product.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function getSingleProduct(req, res) {
    try {
        var data = await Product.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function updateProduct(req, res) {
    try {
        var data = await Product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.baseprice = req.body.baseprice ?? data.baseprice
            data.discount = req.body.discount ?? data.discount
            data.finalprice = req.body.finalprice ?? data.finalprice
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            
            try{
                if(req.files.pic1[0] && data.pic1){
                    fs.unlinkSync("public/products/"+data.pic1)
                }
                data.pic1 = req.files.pic1[0].filename
            }catch(error){}
            try{
                if(req.files.pic2[0] && data.pic2){
                    fs.unlinkSync("public/products/"+data.pic2)
                }
                data.pic2 = req.files.pic2[0].filename
            }catch(error){}
            try{
                if(req.files.pic3[0] && data.pic3){
                    fs.unlinkSync("public/products/"+data.pic3)
                }
                data.pic3 = req.files.pic3[0].filename
            }catch(error){}
            try{
                if(req.files.pic4[0] && data.pic4){
                    fs.unlinkSync("public/products/"+data.pic4)
                }
                data.pic4 = req.files.pic4[0].filename
            }catch(error){}

            await data.save()
            res.send({ result: "Done", message: "Record is Updated!!!" })
        }
        else
            res.send({ result: "Fail", message: "Invalid Id!!!" })
    } catch (error) {
        if (error.keyValue)
            res.send({ result: "Fail", message: "Name Must Be Unique!!!" })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function deleteProduct(req, res) {
    try {
        var data = await Product.findOne({ _id: req.params._id })
        try{
            fs.unlink("public/products/"+data.pic1)
        }catch(error){}
        try{
            fs.unlink("public/products/"+data.pic2)
        }catch(error){}
        try{
            fs.unlink("public/products/"+data.pic3)
        }catch(error){}
        try{
            fs.unlink("public/products/"+data.pic4)
        }catch(error){}

        await data.deleteOne()
        res.send({ result: "Done", message: "Record is Deleted!!!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}

async function searchProduct(req,res){
    try {
        var data = await Product.find({$or:[
            {name:{$regex:req.body.search,$options:"i"}},
            {maincategory:req.body.search},
            {subcategory:req.body.search},
            {brand:req.body.search},
            {color:{$regex:req.body.search,$options:"i"}},
            {size:{$regex:req.body.search,$options:"i"}},
            {stock:{$regex:req.body.search,$options:"i"}},
            {description:{$regex:req.body.search,$options:"i"}}
        ]})  
        res.send({result:"Done",count:data.length,data:data})    
    } catch (error) {
        console.log(error);
        res.status(500).send({result:"Fail",message:"Internal Server Error!!!"})
    }
}
module.exports = [createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct,searchProduct]