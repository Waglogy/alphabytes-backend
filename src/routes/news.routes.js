const express = require("express")
const router = express.Router()
const { addNews } = require("../controllers/news.controller")

router.route("/").post(addNews)

module.exports = router
