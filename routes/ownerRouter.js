const express = require('express')
const router = express.Router()

const ownerModel = require('../models/owner-model')

if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        const owner = await ownerModel.find()
        if (owner.length > 0) {
            return res.status(502).send("Service Unavaliable")
        }

        const { fullName, email, password } = req.body

        const createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        })

        res.status(201).json(createdOwner)
    })
}

router.get('/', async (req, res) => {
    res.send("hey! It's working.")
})

module.exports = router;