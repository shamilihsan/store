const Order = require('../models/order')

exports.addOrder = (req, res, next) => {
    
    const email = req.body.email
    const items = req.body.items
    const total = req.body.total

    console.log(email, items, total);

}

