const generateJWT = require('../utils/generateJWT')
const joi = require('joi')
const userModel = require('../models/user-model')
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    try {
        try {
            validateRequestForRegister(req.body)
        } catch (error) {
            
            req.flash("error",error.message)
            return res.status(400).redirect('/')
        }
        const { fullname, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already registered! Please login.' })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const createdUser = await userModel.create({
            fullname,
            email,
            password: hashPassword
        })

        const token = generateJWT(createdUser)
        res.cookie("token", token)
        res.status(201).json({ msg: 'user created successfully!' })

    } catch (error) {
        console.log("Error in register API", error);
        res.status(500).json({ msg: 'Internal Server Error' })
    }
}

const loginUser = async (req, res) => {
    try {
        try {
            validateRequestForLogin(req.body)
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'Email or Password is incorrect' })
        }
        const isPwdCorrect = await bcrypt.compare(password, user.password)
        if (!isPwdCorrect) {
            return res.status(400).json({ msg: 'Email or Password is incorrect' })
        }

        const token = generateJWT(user)
        res.cookie("token", token)
        return res.status(200).json({ msg: 'You are logged in' })
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
}

const validateRequestForRegister = (requestBody) => {
    const requestSchema = joi.object({
        fullname: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(6).required()
    })

    const { error, value } = requestSchema.validate(requestBody)
    if (error) {
        throw new Error(error)
    }


}

const validateRequestForLogin = (requestBody) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().alphanum().min(6).required()
    })

    const { error } = schema.validate(requestBody)
    if (error) {
        throw new Error(error)
    }
}

module.exports = {
    registerUser,
    loginUser,
    logout
}