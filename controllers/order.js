const Order = require('../models/order')
const User = require('../models/user')

exports.addOrder = (req, res, next) => {

    const email = req.body.email
    const items = req.body.items
    const total = req.body.total

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const error = new Error('A user with the email address ' + email + ' does not exist')
                error.statusCode = 422
                error.data = errors.array()
                throw error
            }

            const order = new Order({
                items: items,
                user: {
                    email: email,
                    userId: user
                }
            })

            return order.save()
        })
        .then(result => {
            res.status(201).json({ message: 'Added order successfully', order: result })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

    console.log(email, items, total);

}

