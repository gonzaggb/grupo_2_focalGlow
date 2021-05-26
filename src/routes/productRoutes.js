//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//requiero el controlador de main
const productController = require ('../controllers/productController');

//Asigno a cada ruta la propiedad del controlador
router.get('/', productController.detail);
router.get('/add', productController.add);


module.exports = router;