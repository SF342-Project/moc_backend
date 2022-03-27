const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    ord: Number,
    Contact: String,
    address: String,
    ShopName: String,
    Latitude: Number,
    Longitude: Number,
    
})

module.exports = mongoose.model('Shop',ShopSchema)