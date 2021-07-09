//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();
//Requiero los middlewares para poder entrar a ciertas rutas
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

//requiero el controlador de category
const categoryController = require('../controllers/categoryController')

//Asigno a cada ruta la propiedad del controlador
router.get('/:categoryName/:id', categoryController.category)


//envia al usuario admin al listado de usuarios
router.get('/', authMiddleware, adminMiddleware, categoryController.list)
router.get('/:id/detail', authMiddleware, adminMiddleware, categoryController.detail)

module.exports = router
