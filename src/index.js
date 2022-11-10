const express = require("express")
const bodyParser = require('body-parser');
const route = require("./routes/route")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json()); 

app.use("/", route)

mongoose.connect("mongodb+srv://chetanya:chetanya@functionup.rvufrcw.mongodb.net/Assignment")
.then(() => console.log("Connected to MongoDb"))
.catch((err) => console.log(err))

app.listen(3000, () => {
    console.log("Listening on port 3000")
})