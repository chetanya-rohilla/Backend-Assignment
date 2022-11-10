const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    marks : {
        type : Number,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "asUser",
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('asStudent', studentSchema)