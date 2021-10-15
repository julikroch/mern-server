const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

exports.createUser = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            res.status(400).send({ msg: 'The user already exists' })
        }

        user = new User(req.body)

        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)

        await user.save()
        res.send({ msg: 'User created succesfully!' })
    }
    catch (error) {
        console.log(error)
        res.status(400).send('An error happened')
    }
}