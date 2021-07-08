//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')
const validations = require('../middleware/validationNewUser')
const validateEditUserMiddleware = require('../middleware/validationEditUser')
const files = require('../helpers/files')
//validacion de login
const validationLogin = require('../middleware/validateLogin')

// guestMiddleware
const guestMiddleware = require('../middleware/guestMiddleware')
//authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const profileAccessMiddleware = require('../middleware/profileAccessMiddleware')
//multer
const uploadRegister = require('../middleware/registryMulter')


const userModel = require('../models/user')



//envia al usuario admin al listado de usuarios
router.get('/', authMiddleware, adminMiddleware, userController.list) // la barra sola equivale a /users porque del app.js vengo con /users


//envia al usuario a la pagina de logueo
router.get('/login', guestMiddleware, userController.login)
//envia los datos de la pagina de logueo al controlador
router.post('/login', validationLogin, userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/register', guestMiddleware, userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/register', uploadRegister.single('profileImg'), validations, userController.create)


// ruta de profile
router.get('/:id/detail', authMiddleware, profileAccessMiddleware, userController.profile)
router.get('/:id/edit', authMiddleware, profileAccessMiddleware, userController.edit)
router.put('/:id/edit', uploadRegister.single('profileImg'), validateEditUserMiddleware, profileAccessMiddleware, userController.update)

//elimina usuario de la lista


router.delete('/:id', userController.delete)

//ruta de deslogueo
router.get('/logout', authMiddleware, userController.logout)


module.exports = router