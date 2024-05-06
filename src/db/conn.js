const mongoose = require("mongoose")
const DB_NAME = "waglogy"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        )
        console.log(
            `DB connected on host : ${connectionInstance.connection.host}`
        )
    } catch (error) {
        console.log("MongoDB connection error : " + error)
        process.exit(1)
    }
}

module.exports = connectDB
