const express = require('express')
const router = express.Router()

router.get('/', async (req,res) => {
    res.send("hey! It's working.")
})

module.exports = router;