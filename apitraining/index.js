const express = require('express')
const app = express()
const bodyParser=require('body-parser')
const morgan=require('morgan')
const mongoose=require('mongoose')
const Product=require('./models/product')
const productsRouter=require('./routers/products')
app.use(bodyParser.json())
app.use(morgan('tiny'))


app.use(`/`,productsRouter)



const PORT = 3000
require('dotenv/config')
const api = process.env.API_URL


mongoose.connect(process.env.CONNECTION_STRING)

.then(()=>{
    console.log("database connected")
})

.catch((err)=>{
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
})

