//Requerimos express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//Requerimos el controlador
const productsApiController = require('../../controllers/API/productsApiController')

//rutas de productos
router.get('/', productsApiController.list)
router.get('/last', productsApiController.lastProduct)
router.get('/productsByCategory/:category', productsApiController.filterByCategory)
router.get('/qty', productsApiController.qty)
router.get('/page/:page/limit/:limit', productsApiController.pagination)
router.get('/byName/:name', productsApiController.findByName) //FEDE 
router.get('/:id', productsApiController.detail)
router.delete('/:id', productsApiController.delete)

module.exports = router