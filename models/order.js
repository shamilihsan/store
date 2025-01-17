const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    items: [
        {
            item: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { 
        type: Number,
        required: true 
    },
    user: {
        email: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
})

module.exports = mongoose.model('Order', OrderSchema)