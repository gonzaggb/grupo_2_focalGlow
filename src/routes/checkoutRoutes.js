const express = require('express')
const { destroy } = require('../controllers/checkoutController')
const router = express.Router()

const checkoutController = require('../controllers/checkoutController')
const controller = require('../controllers/mainController')

router.post('/add', checkoutController.add )
router.get('/',checkoutController.list )
router.delete('/:id', checkoutController.destroy)
router.post('/purchase', checkoutController.purchase)

module.exports = router
