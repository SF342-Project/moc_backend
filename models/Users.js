const mongoose = require('mongoose')

const ProductFavorite = new mongoose.Schema({
    id: String
}, { _id : false })

const ShopFavorite = new mongoose.Schema({
    id: Number
}, { _id : false })

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        require: true,
        max: 1024,
        min: 6,
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    product_lists: [],
    shop_lists: []
})

module.exports = mongoose.model('User', UserSchema)