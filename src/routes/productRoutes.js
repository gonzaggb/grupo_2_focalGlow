//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador
router.get('/', productController.detail);//detalle de un producto
router.get('/add', productController.add);//formulario de creacion de producto
router.post('/add', productController.create)// a donde va el producto creado
router.get('/list', productController.list)//listado de productos
router.get('/:id/edit', productController.edit)// formulario de edicion de producto 
router.put('/:id/edit',productController.update)// a donde va el producto modificado 
router.delete('/:id' ,productController.delete)//funcion para eliminar un producto

module.exports = router
 