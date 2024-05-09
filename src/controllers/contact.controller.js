const { Contact } = require("../modals/contact.modal")
const contact = async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        return res.staus(404).json({ message: "fill all the fields" })
    }
    const createdContact = await Contact.create({
        name,
        email,
        message,
    })
    if (!createdContact) {
        return res
            .status(500)
            .json({ message: "was an error while sending the message" })
    }
    return res.status(200).json({ message: "Sucess" })
}

module.exports = { contact }
