//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
//requiero el controlador de product
const productController = require('../controllers/productController')

//requerir express-validator
const { validateCreateForm } = require('../middleware/validateCreateForm')
const { validateEditForm } = require('../middleware/validateEditForm')
//authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
//requerir el middleware de multer
const upload = require('../middleware/productsMulter')


//Asigno a cada ruta la propiedad del controlador
router.get('/', authMiddleware, adminMiddleware, productController.list)
router.get('/detail/:id', productController.detail)

//Create
router.get('/add', authMiddleware, adminMiddleware, productController.formNew) //formulario de creacion de producto
router.post('/add', upload.any(), validateCreateForm, productController.create)// a donde va el producto creado

//Update
router.get('/:id/edit', authMiddleware, adminMiddleware, productController.edit) //formulario de edicion de producto
router.put('/:id/edit', upload.any(), validateEditForm, productController.update)

//checkout
router.post('/checkout', productController.checkout)

//Delete
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete)

//search
router.get('/search', productController.result)

module.exports = router
