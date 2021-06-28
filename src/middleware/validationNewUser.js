const { body } = require('express-validator')
const files = require('../helpers/files')
const userModel = require ('../models/user')
const validations = [
    body('first_name').notEmpty().withMessage('Debes poner tu nombre'),
    body('last_name').notEmpty().withMessage('Debes poner tu apellido'),
    body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
    .custom((val)=>{
        const userFound = userModel.findByField('email',val)
        if(userFound){
            return false
        }
        return true
    }).withMessage('el usuario ya existe'),
    
    body('password').notEmpty().withMessage('Debes poner una contraseña'),
    body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña'),
    body('profileImg').custom((value, { req }) => {
        const file = req.file
        if (!file) {
            throw new Error('Debes subir una imagen')
        } else if (!files.isFileImage(file.originalname)) {
            throw new Error(`Ingrese un archivo que sea una imágen`)
        }
        return true
    })

]

module.exports = validations