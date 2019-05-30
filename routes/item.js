const express = require('express')
const { body } = require('express-validator/check')

const itemController = require('../controllers/item')

const router = express.Router()

//GET => /items
router.get('/items', itemController.getItems)

//GET => /item
router.get('/item', itemController.getItem)

//POST => /item
router.post('/item', itemController.postItem)

//PUT => /item
router.put('/item', itemController.updateItem)

//DELETE => /item
router.delete('/item', itemController.deleteItem)


module.exports = router;