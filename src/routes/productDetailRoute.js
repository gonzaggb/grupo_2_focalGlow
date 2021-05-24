//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//requiero el controlador de main
const productController = require ('../controllers/productDetailController');

//Asigno a cada ruta la propiedad del controlador
router.get('/', productController.detail);


module.exports = router;