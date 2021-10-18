const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({msg: 'No token was founded'})

    try {
        const cifrate = jwt.verify(token, process.env.SECRET)
        req.user = cifrate.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token not valid'})
    }
}