const express = require('express')

const orderController = require('../controllers/order')

const router = express.Router()

//POST => /order/add-order {email, items, total}
router.post('/add-order', orderController.addOrder)

module.exports = router