const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        image: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        cost: {
            type: Number,
        },
    },
    { timestamps: true }
)
const Course = mongoose.model("Course", courseSchema)

module.exports = { Course }
