const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

dotenv.config()

const router = require("./Routes/index")

require("./dbConnect")
const app = express()
app.use(cors())

app.use("/public", express.static("public"))
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())
app.use("/api",router)


app.use('*', express.static(path.join(__dirname, 'build'))); 
var port = process.env.PORT || 8000
app.listen(port,()=>console.log("Server is Running"))