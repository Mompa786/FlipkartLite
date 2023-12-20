const Checkout = require("../Models/Checkout")
const Razorpay = require("razorpay")

//Payment API
function order(req, res) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RPKEYID,
            key_secret: process.env.RPSECRETKEY,
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR"
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ result: "Fail", message: "Something Went Wrong!" });
            }
            res.status(200).json({ result: "Done", data: order });
        });
    } catch (error) {
        res.status(500).json({ result: "Fail", message: "Internal Server Error!" });
        console.log(error);
    }
};

async function verify(req, res) {
    try {
        var check = await Checkout.findOne({ _id: req.body.checkid })
        check.rppid = req.body.razorpay_payment_id
        check.paymentstatus = "Done"
        check.paymentmode = "Net Banking"
        await check.save()
        res.status(200).send({ result: "Done" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

async function createCheckout(req, res) {
    try {
        var data = new Checkout(req.body)
        data.date = new Date()
        await data.save()
        res.send({ result: "Done", message: "Record is Created!!!", data: data })
    } catch (error) {
        if (error.errors.userid)
            res.send({ result: "Fail", message: error.errors.userid.message })
        else if (error.errors.subtotal)
            res.send({ result: "Fail", message: error.errors.subtotal.message })
        else if (error.errors.total)
            res.send({ result: "Fail", message: error.errors.total.message })
        else if (error.errors.shipping)
            res.send({ result: "Fail", message: error.errors.shipping.message })
        else
            res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function getAllCheckout(req, res) {
    try {
        var data = await Checkout.find().sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function getUserAllCheckout(req, res) {
    try {
        var data = await Checkout.find({ userid: req.params.userid }).sort({ _id: -1 })
        res.send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function getSingleCheckout(req, res) {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        if (data)
            res.send({ result: "Done", data: data })
        else
            res.send({ result: "Fail", message: "Invalid Id!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
async function updateCheckout(req, res) {
    try {
        var data = await Checkout.findOne({ _id: req.params._id })
        if (data) {
            data.paymentmode = req.body.paymentmode ?? data.paymentmode
            data.paymentstatus = req.body.paymentstatus ?? data.paymentstatus
            data.orderstatus = req.body.orderstatus ?? data.orderstatus
            data.rppid = req.body.rppid ?? data.rppid
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
async function deleteCheckout(req, res) {
    try {
        await Checkout.deleteOne({ _id: req.params._id })
        res.send({ result: "Done", message: "Record is Deleted!!!" })
    } catch (error) {
        res.status(500).send({ result: "Fail", message: "Internal Server Error!!!" })
    }
}
module.exports = [createCheckout, getAllCheckout, getUserAllCheckout, getSingleCheckout, updateCheckout, deleteCheckout, order, verify]
