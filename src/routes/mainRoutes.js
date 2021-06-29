//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const mainController = require('../controllers/mainController')
const authMiddleware = require('../middleware/authMiddleware')

//Asigno a cada ruta la propiedad del controlador
router.get('/', mainController.home)
router.get('/checkout',authMiddleware, mainController.checkout)
router.get('/us', mainController.us)

module.exports = router
