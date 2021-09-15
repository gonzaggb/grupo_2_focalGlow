//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()

//Requiero el controlador de usuarios
const userController = require('../controllers/userController')

//Requiero los middleware de validaciones
const validations = require('../middleware/validationNewUser')
const validateEditUserMiddleware = require('../middleware/validationEditUser')
const validateEditUserPasswordMiddleware = require('../middleware/validationEditUserPassword')
const validationLogin = require('../middleware/validateLogin')

// Middlewares de guest, auth y admin - chequean que puedan avanzar o no en ciertas rutas.
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const profileAccessMiddleware = require('../middleware/profileAccessMiddleware')
//multer
const uploadRegister = require('../middleware/registryMulter')


//Rutas
//envia al usuario admin al listado de usuarios
router.get('/', authMiddleware, adminMiddleware, userController.list) // la barra sola equivale a /users porque del app.js vengo con /users

//envia al usuario a la pagina de logueo
router.get('/login', guestMiddleware, userController.login)
//envia los datos de la pagina de logueo al controlador. Es por post para que info sensible no viaje en la URL
router.post('/login', validationLogin, userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/register', guestMiddleware, userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/register', uploadRegister.single('profileImg'), validations, userController.create)


// rutas de profile
router.get('/:id/detail', authMiddleware, profileAccessMiddleware, userController.profile)
router.get('/:id/edit', authMiddleware, profileAccessMiddleware, userController.edit)
router.get('/:id/editPassword', authMiddleware, profileAccessMiddleware, userController.editPassword)
router.put('/:id/editPassword', validateEditUserPasswordMiddleware, profileAccessMiddleware, userController.updatePassword)
router.put('/:id/edit', uploadRegister.single('profileImg'), validateEditUserMiddleware, profileAccessMiddleware, userController.update)

//elimina usuario de la lista
router.delete('/:id', userController.delete)

//ruta de deslogueo
router.get('/logout', authMiddleware, userController.logout)


module.exports = router