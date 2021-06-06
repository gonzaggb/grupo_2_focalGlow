//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador

//View
router.get('/list', productController.list)
router.get('/detail/:id', productController.detail)

//Create
router.get('/add', productController.formNew) //formulario de creacion de producto
router.post('/add', productController.create) // a donde va el producto creado

//Update
router.get('/:id/edit', productController.edit) //formulario de edicion de producto
router.put('/:id/edit', productController.update)

//Delete
router.delete('/:id', productController.delete)

module.exports = router
