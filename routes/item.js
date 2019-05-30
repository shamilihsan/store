const express = require('express')
const { body } = require('express-validator/check')

const itemController = require('../controllers/item')

const router = express.Router()

//GET => /auth/user
router.get('/items', itemController.getItems)


module.exports = router;