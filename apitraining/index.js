const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
const mongoose=require('mongoose')

app.use(bodyParser.json())
app.use(morgan('tiny'))

const productschema=mongoose.Schema({
    Name:String,
    image:String,
    countInStock:Number
})

const product=mongoose.model('product',productschema)

const PORT = 3000
require('dotenv/config')
const api = process.env.API_URL

app.get(`${api}/products`, (req, res) => {
    const products={
        id:1,
        name:"hilda",
        image:"some_url"
    }
    res.send(products)
})

app.post(`${api}/products`, (req, res) => {
    const product=new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })

    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error:err,
            status:false
        })
    })
})

mongoose.connect(process.env.CONNECTION_STRING,{
 useNewUrlParser:true,
 useUnifiedTopology:true,
 dbName:"eshop"
})

.then(()=>{
    console.log("database connected")
})

.catch((err)=>{
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
})
