//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//Requiero los middlewares para poder entrar a ciertas rutas
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const uploadRegister = require('../middleware/registryMulterCategory')
//requiero el controlador de category
const categoryController = require('../controllers/categoryController')


//Asigno a cada ruta la propiedad del controlador
router.get('/:categoryName', categoryController.landing);

//Rutas para Admin únicamente
router.get('/', authMiddleware, adminMiddleware, categoryController.list)
router.get('/detail/:id', authMiddleware, adminMiddleware, categoryController.detail)
router.get('/add', authMiddleware, adminMiddleware, categoryController.formNew)
router.get('/edit/:id', authMiddleware, adminMiddleware, categoryController.edit)
router.put('/edit/:id', uploadRegister.single('imageCover'), authMiddleware, adminMiddleware, categoryController.update)
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete)

module.exports = router
