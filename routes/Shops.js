const router = require('express').Router();
const Shop = require('../models/Shops')

router.get('/getAll', async (req,res) => {
    var filtered = await Shop.find({})
    res.send(filtered)
})
module.exports = router;