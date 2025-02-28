const express = require('express')
const app = express()

require('dotenv').config()
const path = require('path')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const db = require('./config/mongoose.connection')
const userRouter = require('./routes/userRouter')
const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter')
const indexRouter = require('./routes/indexRouter')


console.log("environment::::::::::::::::::::::::::::",process.env.NODE_ENV);
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


console.log("EXPRESS_SESSION_SECRET::::::::::",process.env.EXPRESS_SESSION_SECRET)
//flash and session
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cookieParser())
app.use(flash())

app.use('/', indexRouter)
app.use('/users',userRouter)
app.use('/owner', ownerRouter)
app.use('/products', productRouter)

app.listen(3000, () => {
    console.log('Server running on 3000');
})