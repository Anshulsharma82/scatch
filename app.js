const express = require('express')
const app = express()

const path = require('path')
const userRouter = require('./routes/userRouter')
const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter')

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user',userRouter)
app.use('/owner', ownerRouter)
app.use('/product', productRouter)

app.listen(3000, () => {
    console.log('Server running on 3000');
})