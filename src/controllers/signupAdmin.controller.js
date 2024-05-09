const { User } = require("../modals/register.modal.js")
const signupAdmin = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.staus(400).json({ message: "Fill in all the credentials" })
    }
    const admin = await User.create({
        name,
        email,
        password,
        isAdmin: true,
    })
    if (!admin) {
        return res.status(500).json({ messge: "couldn't create an account" })
    }
    return res.status(200).json({
        data: admin,
        message: "admin created sucessfully",
    })
}

module.exports = { signupAdmin }
