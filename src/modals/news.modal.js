const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        links: {
            type: String,
        },
    },
    { timestamps: true }
)
const News = mongoose.model("News", newsSchema)

module.exports = { News }
