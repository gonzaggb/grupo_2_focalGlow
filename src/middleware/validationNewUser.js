const { body } = require('express-validator')
const files = require('../helpers/files')
const { User } = require('../database/models')

const validations = [

    body('firstName').notEmpty().withMessage('Debes poner tu nombre'),
    body('lastName').notEmpty().withMessage('Debes poner tu apellido'),
    body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
        .custom(async (val) => {
            const userFound = await User.findOne(
                { where: { email: val } })

            if (userFound) {

                return Promise.reject('El usuario ya existe')
            }
            return true
        }),

    body('password').notEmpty().withMessage('Debes poner una contraseña').bail(),
    body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña').bail(),
    body('rePassword').custom((val, { req }) => {
        let password = req.body.password
        if (val != password) {
            throw new Error(`Las contraseñas deben coincidir`)
        }
        return true
    }),
    body('profileImg').custom((value, { req }) => {
        const file = req.file

        if (file && !files.isFileImage(file.originalname)) {
            throw new Error(`Ingrese un archivo que sea una imagen`)
        }
        return true
    })
]

module.exports = validations