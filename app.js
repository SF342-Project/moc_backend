const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const app = express()
const port = 4000

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
})

const db = mongoose.connection;
db.once('open',()=>{
    console.log('Connected to MongoDB....');
})

app.use(bodyParser.json());

const ProductRoute = require('./routes/Products')
const PriceRoute = require('./routes/Prices')
const AuthRoute = require('./routes/auth')
const UserRoute = require('./routes/Users')
const ShopRoute = require('./routes/shops')

app.use('/products',ProductRoute)
app.use('/price',PriceRoute)
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/shops',ShopRoute)

app.listen(port,console.log("Listening on port: 127.0.0.1:",port))
