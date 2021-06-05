//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador

//Mostrar Productos
router.get('/list', productController.list)
router.get('/detail/:id', productController.detail)

//Crear Productos
router.get('/add', productController.formNew)
router.post('/add', productController.create)

//Update Productos
router.get('/edit/:id', productController.edit)
router.put('/edit/:id', productController.update)

//Delete Producto
router.delete('/delete/:id', productController.delete)
module.exports = router
