const { default: mongoose } = require("mongoose")
const mongooose = require("mongoose")

const registerSchema = new mongooose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        coursetype: {
            type: String,
            required: true,
        },
        aadhar: {
            type: String,
            required: true,
        },
        gaurdianname: {
            type: String,
            required: true,
        },
        parentcontact: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", registerSchema)
