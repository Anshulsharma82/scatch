const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModel = require('../models/product-model')

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgColor, panelColor, textColor } = req.body
        await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgColor,
            panelColor,
            textColor
        })
        req.flash("success", "product created successfully!")
        res.status(200).redirect("/owner/admin")
        
    } catch (err) {
        console.log("Error in /products/create route", err)
        res.status(500).json({msg: "Internal Server Error"})
    }
})

module.exports = router;