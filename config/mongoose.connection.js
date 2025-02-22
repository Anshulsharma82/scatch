const mongoose = require("mongoose")
const dbgr = require("debug")("development:mongoose");

async function dbConnect() {
    try {
        const connectionString = process.env.MONGO_DB_URI
        await mongoose.connect(connectionString)
        dbgr("DB connected debug!")
        console.log("DB Connected!")
    } catch (err) {
        console.log(err)
    }
}
dbConnect()

module.exports = mongoose.connection