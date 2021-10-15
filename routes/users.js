const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

router.post('/',
    [
        check('name', 'The user name is required').not().isEmpty(),
        check('The email must be valid').isEmail(),
        check('The password must have at least 6 characters').isLength({ min: 6 })
    ],
    userController.createUser
)

module.exports = router