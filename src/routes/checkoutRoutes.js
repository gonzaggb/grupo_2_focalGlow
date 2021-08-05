const express = require('express')
const router = express.Router()

const checkoutController = require('../controllers/checkoutController')

router.post('/add', checkoutController.add )


module.exports = router
