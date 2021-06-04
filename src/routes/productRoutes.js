//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador
router.get('/detail/:id', productController.detail)
router.get('/add', productController.add)
router.post('/add', productController.create)
router.get('/list', productController.list)
router.get('/edit', productController.edit)
router.get('/delete/:id', productController.delete) //estoy usando metodo GET por que uso el mismo form para varios botones
/* router.put('/edit', productController.edit) */
module.exports = router
