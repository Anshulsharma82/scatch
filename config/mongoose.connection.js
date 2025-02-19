const mongoose = require("mongoose")

async function dbConnect() {
    try {
        const connectionString = 'mongodb+srv://anshulsharma4445:dO1ovHaiV5ochk0f@cluster0.5bpj4.mongodb.net/scatchDemo?retryWrites=true&w=majority&appName=Cluster0'
        await mongoose.connect(connectionString)
        console.log("DB Connected!")
        return db
    } catch (err) {
        console.log(err)
    }
}
dbConnect()

module.exports = mongoose.connection