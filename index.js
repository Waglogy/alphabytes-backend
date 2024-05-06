const dotenv = require("dotenv")
const app = require("./src/app.js")
const connectDB = require("./src/db/conn.js")
dotenv.config({
    path: "./.env",
})

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("ERROR: " + error)
            throw error
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is listening at port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("mongoDB connection FAILED !!!" + err)
    })
