const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const error = req.flash("error")
    res.render("index", { error })
})

module.exports = router;