const { body } = require('express-validator')
const files = require('../helpers/files')
const { User } = require('../database/models')


const validations = [

	body('firstName').notEmpty().withMessage('El nombre no puede estar vacío'),
	body('lastName').notEmpty().withMessage('El apellido no puede estar vacío'),
	body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
		.custom(async (val, { req }) => {
			const userFound = await User.findOne({ where: { email: val } })
			const userLogged = await User.findByPk(req.session.logged)


			if (userFound && userFound.id == userLogged.id) {
				return true
			} else if (userLogged.role == 'admin' && userFound.id == req.body.id) {
				return true
			} else if (userFound) {
				return Promise.reject('El usuario ya existe')
			}
			return true
		}),

	//MARS: Le doy la opcion de que si desea modificar la contraseña entonces debe ser validado por el middleware. Ver el metodo .if(body...) que trae express validator


	body('password').if(body('passModify').equals('yes')).notEmpty().withMessage(`Debes introducir una contraseña`),

	body('rePassword').if(body('passModify').equals('yes')).notEmpty().withMessage('Debes confirmar la contraseña'),

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