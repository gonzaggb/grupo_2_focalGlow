const express = require('express')
const { destroy } = require('../controllers/checkoutController')
const router = express.Router()

const checkoutController = require('../controllers/checkoutController')

router.post('/add', checkoutController.add )
router.get('/',checkoutController.list )
router.delete('/:id', checkoutController.destroy)

module.exports = router
