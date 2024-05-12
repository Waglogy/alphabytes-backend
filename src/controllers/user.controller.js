const { User } = require("../modals/register.modal.js")
const uploadOnCloudinary = require("../utils/cloudinary.js")
const registerUser = async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        coursetype,
        aadhar,
        gaurdianname,
        parentcontact,
    } = req.body
    console.log(
        name,
        email,
        phone,
        address,
        coursetype,
        aadhar,
        gaurdianname,
        parentcontact
    )
    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !coursetype ||
        !aadhar ||
        !gaurdianname ||
        !parentcontact
    ) {
        return res.status(400).json({ message: "Credentials are required" })
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        return res.status(409).json({ message: "user already enrolled" })
    }

    console.log(req.files)
    const avatarLocalPath = req.files?.avatar?.path
    if (!avatarLocalPath) {
        return res.status(404).json({ message: "no avatar local path" })
    }

    const image = await uploadOnCloudinary(avatarLocalPath)
    if (!image) {
        return res.status(500).json({ message: "image file couldn't upload" })
    }

    const user = await User.create({
        image,
        name,
        email,
        phone,
        address,
        coursetype,
        aadhar,
        gaurdianname,
        parentcontact,
    })
    if (!user) {
        return res.status(500).json({ message: "could not create user" })
    }

    res.status(200).json({ message: "user created sucessfully" })
}

module.exports = { registerUser }
