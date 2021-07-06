const { body, oneOf } = require('express-validator')
const files = require('../helpers/files')
const userModel = require('../models/user')
const validations = [
	body('first_name').notEmpty().withMessage('El nombre no puede estar vacío'),
	body('last_name').notEmpty().withMessage('El apellido no puede estar vacío'),
	body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
		.custom((val, { req }) => {
			const userFound = userModel.findByField('email', val)
			if (userFound && userFound.id == req.session.logged) {
				return true
			} else if (userFound) {
				return false
			}
			return true
		}).withMessage('El usuario ya existe'),

	//MARS: Le doy la opcion de que si NO desea modificar la contraseña pase el middleware	
	oneOf([body('passModify').equals('No'),
	[
		body('password').notEmpty().withMessage('Debes poner una contraseña').bail(),
		body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña').bail(),
		/*	body('rePassword').custom((val, { req }) => {
				let password = req.body.password
				if (val != password) {
					throw new Error(`Las contraseñas deben coincidir`)
				}
				return true
			})*/
	]], 'Debes ingresar una contraseña y que coincidan')

]




/*body('profileImg').custom((value, { req }) => {
		const file = req.file
		if (!file) {
				throw new Error('Debes subir una imagen')
		} else if (!files.isFileImage(file.originalname)) {
				throw new Error(`Ingrese un archivo que sea una imagen`)
		}
		return true
})*/



module.exports = validations