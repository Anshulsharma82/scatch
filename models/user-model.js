const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName: {
        type: String
        
    },
    email: String,
    password: String,
    cart: [],
    orders: [],
    contact: Number,
    picture: String
})

module.exports = mongoose.model('user',userSchema)