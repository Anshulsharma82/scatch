const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')
async function isLoggedIn(req,res,next) {
    if(!req.cookie.token) {
        req.flash("error","Please login to continue")
        return res.redirect("/")
    }
    try {
        const decoded = jwt.verify(req.cookie.token, process.env.JWT_SECRET)
        const user =   await userModel.findOne({email: decoded.email})
        req.user = user
        next()
    } catch (error) {
        req.flash("error","Something went wrong!")
        return res.redirect("/")
    }
}

module.exports = isLoggedIn