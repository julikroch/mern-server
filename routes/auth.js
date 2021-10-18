const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')

router.post('/',
    [
        check('The email must be valid').isEmail(),
        check('The password must have at least 6 characters').isLength({ min: 6 })
    ],
    authController.authenticateUser
)

module.exports = router