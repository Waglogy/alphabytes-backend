const express = require("express")
const { registerUser } = require("../controllers/user.controller.js")
const {
    loginUser,
    refreshAccesstoken,
} = require("../controllers/login.controller.js")
const router = express.Router()
const { upload } = require("../middlewares/multer.js")

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccesstoken)

module.exports = router
