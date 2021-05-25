//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//requiero el controlador de main
const mainController = require ('../controllers/mainController');

//Asigno a cada ruta la propiedad del controlador
router.get('/', mainController.home)
router.get('/login', mainController.login);
router.get('/registro', mainController.registro);
router.get('/checkout', mainController.checkout);
module.exports = router;