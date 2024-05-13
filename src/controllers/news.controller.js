const { News } = require("../modals/news.modal")
const addNews = async (req, res) => {
    const { title, content, links } = req.body
    if (!title || !content || !links) {
        return res.status(200).json({ message: "fill in all the fields" })
    }
    // const imageLocalPath = req.files?.image[0]?.path

    // if (!imageLocalPath) {
    //     res.status(400).json({ message: "image file is required locally" })
    // }
    // const image = await uploadOnCloudinary(imageLocalPath)

    await News.create({
        title,
        content,
        links,
        // image,
    })

    return res.status(200).json({ message: "news created sucessfully" })
}
module.exports = { addNews }
