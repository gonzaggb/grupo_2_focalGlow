//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')
const validations = require('../middleware/validationNewUser')
const files = require('../helpers/files')


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
    console.log(file)
    if (!files.isFileImage(file.originalname)) {
        console.log(`file que llega al route ${file.path}`)
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

//envia al usuario a la pagina de logueo
router.get('/login', userController.login)
//envia los datos de la pagina de logueo al controlador
router.post('/login', userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/registro', userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/registro', upload.single('profileImg'), validations, userController.create)

//envia al usuario admin al listado de usuarios
router.get('/', userController.list) // la barra sola equivale a /users porque del app.js vengo con /users

//elimina usuario de la lista
router.get('/:id/edit', userController.edit)
router.delete('/:id', userController.delete)
router.put('/:id/edit', userController.update)


module.exports = router