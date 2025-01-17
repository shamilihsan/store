const express = require('express')
const { body } = require('express-validator/check')

const isAuth = require('../middleware/is-auth');

const itemController = require('../controllers/item')

const router = express.Router()

//GET => /items
router.get('/items', itemController.getItems)

//GET => /item {name}
router.get('/item/:itemId', itemController.getItem)

//POST => /item {name, price, description}
router.post('/item', isAuth, itemController.postItem)


// -------------- Not implemented -----------------

//PUT => /item
router.put('/item', itemController.updateItem)

//DELETE => /item
router.delete('/item', itemController.deleteItem)


module.exports = router;