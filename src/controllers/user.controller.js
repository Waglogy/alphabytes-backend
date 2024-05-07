const User = require("../modals/register.modal.js")
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
    const existedUser = await User.findOne({
        $or: [{ name }, { email }],
    })
    if (existedUser) {
        res.status(409).json({ message: "user already exist" })
    }
    const user = await User.create({
        name,
        email,
        // coverImage is optional so. code fatey na isiliye
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
