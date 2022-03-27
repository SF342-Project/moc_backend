const mongoose = require('mongoose')

const PriceSchema = new mongoose.Schema({
    id: String,
    date: String,
    price_min: Number,
    price_max: Number
})

module.exports = mongoose.model('Price',PriceSchema)