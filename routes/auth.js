const express = require('express')
const { body } = require('express-validator/check')

const User = require('../models/user')

const authController = require('../controllers/auth')

const router = express.Router()

//GET => /auth/user {email, password}
router.get('/login', authController.login)

//POST => /auth/user {email, password, name}
router.post('/user', [
    body('name').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 3 }),
    body('email')
        .isEmail()
        .withMessage('Please enter valid email')
        .normalizeEmail()
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Account already exists with the given email address')
                }
            })
        })
],
    authController.postUser
)

//DELETE => /auth/deleteuser {email}
router.delete('/user', authController.deleteUser)

module.exports = router;