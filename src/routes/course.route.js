const express = require("express")
const router = express.Router()
const { addCourse } = require("../controllers/course.controller")
router.route("/add").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        },
    ]),
    addCourse
)

module.exports = router
