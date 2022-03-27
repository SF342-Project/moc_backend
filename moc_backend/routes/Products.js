const express = require('express');
const Product = require('../models/Products')
const router = express.Router()


router.get('/all',async (req,res)=>{
    var filtered = await Product.find({})
    res.send(filtered)
})


router.get('/id/:id',async (req,res) =>{
    var filtered = await Product.find({'id':req.params.id})
    res.send(filtered)
})

router.get('/keyword/:keyword',async (req,res) =>{
    var mock_data = await Product.find({});

    var result = [];
    for(var i = 0; i<mock_data.length;i++){
        if(mock_data[i].name.indexOf(req.params.keyword) > -1) result.push(mock_data[i]);
    }
    res.send(result)
})

router.get("/:apiName",async (req, res) => {
    var mock_data = await Product.find({});

    var result = [];
    for(var i = 0; i<mock_data.length;i++){
        if(mock_data[i].name.indexOf(req.query.keyword) > -1) result.push(mock_data[i]);
    }
    res.send(result)
})


module.exports = router