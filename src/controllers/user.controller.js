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
        res.status(400).json({ message: "Credentials are required" })
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
        res.status(409).json({ message: "user already enrolled" })
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        res.status(400).json({ message: "Avatar file is required local" })
    }
    const image = await uploadOnCloudinary(avatarLocalPath)

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
        res.status(500).json({ message: "could not create user" })
    }

    return res.status(200).json({ message: "user created sucessfully" })
}

module.exports = { registerUser }
