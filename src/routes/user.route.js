const express = require("express")
const { registerUser } = require("../controllers/user.controller.js")
const {
    loginUser,
    refreshAccesstoken,
} = require("../controllers/login.controller.js")
const router = express.Router()
const multer = require("../middlewares/multer")

router.route("/register").post(multer.array("image"), registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccesstoken)

module.exports = router
