const { body } = require('express-validator')
const files = require('../helpers/files')
const userModel = require('../models/user')
const validations = [
	//FIXME
	body('first_name').notEmpty().withMessage('El nombre no puede estar vacío'),
	body('last_name').notEmpty().withMessage('El apellido no puede estar vacío'),
	body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
		.custom((val, { req }) => {
			const userFound = userModel.findByField('email', val)
			const userAdmin = userModel.findByPk(req.session.logged)
			if (userFound && (userFound.id == req.session.logged || userAdmin.category == 'admin')) {
				return true
			} else if (userFound) {
				return false
			}
			return true
		}).withMessage('El usuario ya existe'),

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

	/*body('profileImg').custom((value, { req }) => {
		const file = req.file
		if (!file) {
			throw new Error('Debes subir una imagen')
		} else if (!files.isFileImage(file.originalname)) {
			throw new Error(`Ingrese un archivo que sea una imagen`)
		}
		return true
	})*/

]








module.exports = validations