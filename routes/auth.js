const express = require('express')
const { body } = require('express-validator/check')

const authController = require('../controllers/auth')

const router = express.Router()

//GET => /auth/user
router.get('/user', authController.getUser)

//POST => /auth/user
router.post('/user', authController.postUser)

module.exports = router;