const { default: mongoose } = require("mongoose")
const mongooose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerSchema = new mongooose.Schema(
    {
        image: {
            type: String,
        },
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
        refreshToken: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
        },
    },
    {
        timestamps: true,
    }
)

registerSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

registerSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
registerSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}
const User = mongoose.model("User", registerSchema)

module.exports = { User }
