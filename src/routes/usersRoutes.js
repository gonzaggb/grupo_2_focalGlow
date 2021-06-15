//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')
const { body } = require('express-validator')
const validations = [
    body('name').notEmpty().withMessage('Debes poner tu nombre'),
    body('surname').notEmpty().withMessage('Debes poner tu apellido'),
    body('email').notEmpty().withMessage('Debes poner tu email'),
    body('password').notEmpty().withMessage('Debes poner una contraseña'),
    body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña')

]

var storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/profile-pictures'))

    },
    filename:(req, file, cb) => {
        const extensionFile = path.extname(file.originalname)
        cb(null, `${Date.now()}${extensionFile}`)


    }
})
var upload = multer({storage})

//envia al usuario a la pagina de logueo
router.get('/login', userController.login)
//envia los datos de la pagina de logueo al controlador
router.post('/login', userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/registro', userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/registro',upload.single('profile-img'), validations,  userController.create)

//envia al usuario admin al listado de usuarios
router.get('/',  userController.list) // la barra sola equivale a /users porque del app.js vengo con /users

//elimina usuario de la lista
router.get('/:id/edit', userController.edit)
router.delete('/:id', userController.delete)
router.put('/:id/edit', userController.update)


module.exports = router

