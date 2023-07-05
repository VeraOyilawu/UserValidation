const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    number: {
        type : Number,
        required: true
    },
    profile: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    }
}, {timestamps: true})

const userModel = mongoose.model("userProfile", userSchema)
module.exports = userModel