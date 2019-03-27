const express = require('express')
const router = express.Router()

router.get('/moviehes', (req, res) => {
    res.json(movies)
})


module.exports = router
