const express = require('express')
const { body } = require('express-validator/check')

const authController = require('../controllers/auth')

const router = express.Router()

//GET => /auth/user
router.get('/user', authController.getUser)

//POST => /auth/user
router.post('/user', [
    body('name').trim().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 3 }),
    body('email').isEmail().withMessage('Please enter valid email').normalizeEmail()
],
    authController.postUser
)

module.exports = router;