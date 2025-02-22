const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
    return jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_TOKEN)
}

module.exports = generateJWT