//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')
const validations = require('../middleware/validationNewUser')
const validateEditUser = require('../middleware/validationEditUser')
const files = require('../helpers/files')
//validacion de login
const validationLogin = require('../middleware/validateLogin')

// guestMiddleware
const guestMiddleware = require('../middleware/guestMiddleware')
//authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const profileAccessMiddleware = require('../middleware/profileAccessMiddleware')


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
router.get('/register', guestMiddleware, userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/register', upload.single('profileImg'), validations, userController.create)


// ruta de profile
router.get('/:id/detail', authMiddleware, profileAccessMiddleware, userController.profile)
router.get('/:id/edit', authMiddleware, profileAccessMiddleware, userController.edit)
router.put('/:id/edit', upload.single('profileImg'), profileAccessMiddleware, userController.update)

//elimina usuario de la lista


router.delete('/:id', userController.delete)

//ruta de deslogueo
router.get('/logout', authMiddleware, userController.logout)


module.exports = router