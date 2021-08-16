const { body } = require('express-validator')
const files = require('../helpers/files')
const { User } = require('../database/models')

const validations = [

	body('firstName')
		.notEmpty().withMessage('Ingresá tu nombre').bail()
		.isLength({ min: 2 }).withMessage('Tu nombre debe tener al menos 2 caracteres'),
	body('lastName')
		.notEmpty().withMessage('Ingresá tu apellido').bail()
		.isLength({ min: 2 }).withMessage('Tu apellido debe tener al menos 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Ingresá tu email').bail()
		.isEmail().withMessage("El email ingresado no es válido").bail()
		.custom(async (val) => {
			const userFound = await User.findOne(
				{ where: { email: val } })

			if (userFound) {

				return Promise.reject('El usuario ya existe')
			}
			return true
		}),

	body('password')
		.notEmpty().withMessage('Ingresá una contraseña').bail()
		.isStrongPassword().withMessage('Tu contraseña es poco segura, por favor incluye caracteres especiales, mayusculas y números'),
	body('rePassword')
		.notEmpty().withMessage('Confirmá la contraseña').bail(),
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