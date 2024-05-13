const { Course } = require("../modals/course.modal")

const addCourse = async (req, res) => {
    const { name, duration, description, cost } = req.body

    if (!name || !duration || !description || cost) {
        return req.status(400).json({ message: "credentials are required" })
    }
    const newCourse = await Course.create({
        name,
        duration,
        description,
        cost,
    })
    if (!newCourse) {
        return res.status(500).json({
            message: "there was an error while creating the new course",
        })
    }
    res.status(200).json({ message: "Success" })
}

module.exports = addCourse
