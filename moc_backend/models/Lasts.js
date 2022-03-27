const mongoose = require('mongoose')

const LastSchema = new mongoose.Schema({
    id: String,
    date: String
})
module.exports = mongoose.model('Last',LastSchema)