const express = require('express')
const Price = require('../models/Prices')
const router = express.Router()
const fetch = require('node-fetch');
const Last = require('../models/Lasts')

function reqDateFormat(dt){
    const d = new Date(dt)
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const date = d.getDate();
    var localTime = year + '-' + month.toString().padStart(2, '0') + '-' + date
    // return localTime + "T00:00:00";
    return localTime;
}

function dbDateFormat(localTime){
    return localTime + "T00:00:00";
}


function subDays(date, days){
    const result = new Date();
    result.setDate(date.getDate() - days);
    return result
}

function getProductPrices(product_id,from_date,to_date){
    const fetchData = fetch('https://dataapi.moc.go.th/gis-product-prices?product_id='+product_id+'&from_date='+from_date+'&to_date='+to_date)
    .then(_res => _res.json())
    .then((text) =>{
        return text.price_list
    } );
    return fetchData
}
// https://stackoverflow.com/questions/12467102/how-to-get-the-latest-and-oldest-record-in-mongoose-js-or-just-the-timespan-bet/54741405


router.get('/now/:id',async (req,res) =>{
    var now = new Date()
    var now_formatted = reqDateFormat(now)
    var before = subDays(now,15)
    var before_formatted = reqDateFormat(before)
    
    var now_formatted_db = dbDateFormat(now_formatted)

    var _latest = await Last.findOne({'id':req.params.id},{},{'date':-1})
    if (_latest === null){
        var newLast = new Last({
            'id':req.params.id,
            'date':dbDateFormat(now_formatted)
        })
        await newLast.save()

    }
    var latest = await Last.findOne({'id':req.params.id},{},{'date':-1})
    var lastd = new Date(latest.date)
    var dif_date = Math.round((now.getTime() - lastd.getTime()) / (1000 * 60 * 60 * 24))
    if (dif_date > 0 || _latest === null){
        var product_detail = await getProductPrices(req.params.id,before_formatted,now_formatted)
        for(var i = 0; i< product_detail.length; i++){
            var prodt = product_detail[i]
            var _date = prodt.date
            var price_min = prodt.price_min;
            var price_max = prodt.price_max;
            var findData = await Price.find({'id':req.params.id,'date':_date})
            if (findData.length === 0){
                var newPrices = new Price({
                    "id":req.params.id,
                    "date": _date,
                    "price_min":price_min,
                    "price_max":price_max
                })
                await newPrices.save()
            }
        }
        
        var latestData = await Price.findOne({'id':req.params.id}, {}, { sort: { 'date' : -1 } });
        res.send(latestData)
        
    }
    else{
        var latestData = await Price.findOne({'id':req.params.id}, {}, { sort: { 'date' : -1 } });
        res.send(latestData)
    }
    
})

router.get('/compare/:id/:from/:to',async (req,res) =>{
    var from_date_db = dbDateFormat(req.params.from)
    var to_date_db = dbDateFormat(req.params.to)
    
    var filtered = await Price.find({'id':req.params.id,'date':{"$gte": from_date_db, "$lt": to_date_db}})
    res.send(filtered)
})



module.exports = router