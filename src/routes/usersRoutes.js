//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

//envia al usuario a la pagina de logueo
router.get('/login', userController.login)
//envia los datos de la pagina de logueo al controlador
router.post('/login', userController.loginUser)

//envia al usuario a la pagina de registro
router.get('/registro', userController.newUser)
//envia los datos de la pagina de registro al controlador
router.post('/registro', userController.create)

//envia al usuario admin al listado de usuarios
router.get('/',  userController.list) // la barra sola equivale a /users porque del app.js vengo con /users

//elimina usuario de la lista
router.get('/:id/edit', userController.edit)
router.delete('/:id', userController.delete)
router.put('/:id/edit', userController.update)


module.exports = router

