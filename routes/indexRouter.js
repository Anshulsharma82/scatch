const express = require('express')
const router = express.Router()
const productsModel = require('../models/product-model')

router.get('/', async (req, res) => {
    const error = req.flash("error")
    res.render("index", { error })
})

router.get('/shop', async (req,res) => {
    const products = await productsModel.find()
    res.render("shop", { products })
})

module.exports = router;