const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    image: {
        type: String
    },
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    panelColor: String,
    textColor: String
})

module.exports = mongoose.model('post',postSchema)