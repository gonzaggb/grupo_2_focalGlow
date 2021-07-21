//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//Requiero los middlewares para poder entrar a ciertas rutas
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const uploadRegister = require('../middleware/categoryMulter');
const validateNewCategory = require('../middleware/validationNewCategory')
const validateEditCategory = require('../middleware/validationEditCategory');
//requiero el controlador de category
const categoryController = require('../controllers/categoryController')



//Rutas para Admin únicamente
router.get('/', authMiddleware, adminMiddleware, categoryController.list)
router.get('/detail/:id', authMiddleware, adminMiddleware, categoryController.detail)

router.get('/add', authMiddleware, adminMiddleware, categoryController.formNew)
router.post('/add', uploadRegister.any('imageCover', 'imageHome'), validateNewCategory, authMiddleware, adminMiddleware, categoryController.create)

router.get('/edit/:id', authMiddleware, adminMiddleware, categoryController.edit)
router.put('/edit/:id', uploadRegister.any('imageCover', 'imageHome'), authMiddleware, adminMiddleware, validateEditCategory, categoryController.update)

router.delete('/:id', authMiddleware, adminMiddleware, categoryController.delete)

//Asigno a cada ruta la propiedad del controlador
router.get('/:name/:id', categoryController.landing);


module.exports = router
