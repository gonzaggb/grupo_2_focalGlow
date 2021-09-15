//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de check out
const checkoutController = require('../controllers/checkoutController')

//Asigno a cada ruta el método del del controlador
router.post('/add', checkoutController.add)
router.get('/', checkoutController.list)
router.get('/history', checkoutController.history)
router.delete('/:id', checkoutController.destroy)
router.post('/purchase', checkoutController.purchase)

module.exports = router
