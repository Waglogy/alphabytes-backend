const express = require("express")
const { registerUser } = require("../controllers/user.controller")
const router = express.Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
    ]),
    registerUser
)

module.exports = router
