//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')
const validations = require('../middleware/validationNewUser')
const files = require('../helpers/files')
//validacion de login
const validationLogin = require('../middleware/validateLogin')
// guestMiddleware
const guestMiddleware = require('../middleware/guestMiddleware')
//authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const userModel = require('../models/user')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/profile-pictures'))

    },
    filename: (req, file, cb) => {
        const extensionFile = path.extname(file.originalname)
        cb(null, `${Date.now()}${extensionFile}`)


    }

})

const fileFilter = (req, file, cb) => {

    if (!files.isFileImage(file.originalname)) { //evalua que el archivo sea una imagen
        req.file = file
        cb(null, false)
        return
    } else {
        // Si aceptamos el archivo
        cb(null, true)
        return

    }
}


var upload = multer({ storage, fileFilter })

//envia al usuario admin al listado de usuarios
router.get('/', authMiddleware, adminMiddleware, userController.list) // la barra sola equivale a /users porque del app.js vengo con /users


//envia al usuario a la pagina de logueo
router.get('/login', guestMiddleware, userController.login)
//envia los datos de la pagina de logueo al controlador
router.post('/login', validationLogin, userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/registro', userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/registro', upload.single('profileImg'), validations, userController.create)


// ruta de profile
router.get('/:id/detail', userController.profileId) // por el listado de users
router.get('/profile', authMiddleware, userController.profile) // por el link al perfil del usuario
//router.get('/profile/edit', userController.editProfile)


//elimina usuario de la lista
router.get('/:id/edit', userController.edit)

router.delete('/:id', userController.delete)
router.put('/:id/edit', upload.single('profileImg'), userController.update)
//ruta de deslogueo
router.get('/logout', authMiddleware, userController.logout)


module.exports = router