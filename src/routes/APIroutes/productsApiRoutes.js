const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/API/productsApiController')

//ruta para traer todos los usuarios
router.get('/', productsApiController.list)
router.get('/last', productsApiController.lastProduct)
router.get('/productsByCategory/:category', productsApiController.filterByCategory)
router.get('/qty', productsApiController.qty)
//FIXME hay que ver como recibir parametros de paginacion y limite
//router.get('/page/?{page}&{limit}', productsApiController.pagination)
router.get('/byName/:name', productsApiController.findByName) //FEDE 
router.get('/:id', productsApiController.detail)
router.delete('/:id', productsApiController.delete)




module.exports = router