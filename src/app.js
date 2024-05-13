const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))

const userRouter = require("../src/routes/user.route.js")
const contactRouter = require("../src/routes/contact.route.js")
app.use("/user", userRouter)
app.use("/contact", contactRouter)

module.exports = app
