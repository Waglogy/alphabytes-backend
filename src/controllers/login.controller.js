const { User } = require("../modals/register.modal.js")
const jwt = require("jsonwebtoken")
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken

        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        res.status(500).json({
            message:
                "something went wrong while generating the refresh and access token" +
                "\n" +
                error,
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        res.status(400).json({ message: "email is required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
        res.status(400).json({ message: "user not found" })
    }

    const isPassword = await user.isPasswordCorrect(password)

    if (!isPassword) {
        res.status(401).json({ message: "Invalid user credentials" })
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user?._id
    )

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpsOnly: true,
        secure: true,
    }
    const data = {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(data, { message: "user logged in sucessfulyy" })
}

const refreshAccesstoken = async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "unauthorized request" })
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).json({ message: "invalid refresh token" })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res
                .status(401)
                .json({ message: "refresh token is expired or used" })
        }

        const options = {
            httpsOnly: true,
            secure: true,
        }

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefreshToken(user._id)

        return res
            .status(200)
            .coookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
                { message: "access token refreshed" }
            )
    } catch (error) {
        return res
            .status(401)
            .json({ message: error?.message || "invalid refresh token" })
    }
}

module.exports = {
    generateAccessAndRefreshToken,
    loginUser,
    refreshAccesstoken,
}
