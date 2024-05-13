const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))

const userRouter = require("../src/routes/user.route.js")
const contactRouter = require("../src/routes/contact.route.js")
const newsRouter = require("../src/routes/news.routes.js")
app.use("/user", userRouter)
app.use("/contact", contactRouter)
app.use("/news", newsRouter)

module.exports = app
