const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

//GET => /auth/user
router.get('/user', authController.getUser)

module.exports = router;