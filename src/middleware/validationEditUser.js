//MIDDLEWARE CON EXPRESS VALIDATOR PARA CHEQUEAR LOS DISTINTOS CAMPOS DEL FORMULARIO DE EDICION DE USUARIO

const { body } = require('express-validator')
const files = require('../helpers/files')
const { User } = require('../database/models')


const validations = [

	body('firstName').notEmpty().withMessage('El nombre no puede estar vacío'),
	body('lastName').notEmpty().withMessage('El apellido no puede estar vacío'),
	body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido").bail()
		.custom(async (val, { req }) => {
			const userFound = await User.findOne({ where: { email: val } })

			//VALIDAR: 
			//1. Un usuario pueda cambiar su mail pero que no este repetido en la BD
			//2. El administrador pueda cambiar el mail de un usuario pero que no este repetido en la BD

			//1. 
			const userToEdit = await User.findByPk(req.params.id) // datos del usuario a editar

			//Si el usuario CAMBIA el mail
			if (!userFound) {
				return true
			}
			//Si el usuario NO cambia el mail
			if (userToEdit.email == userFound.email) {
				return true
			}

			return Promise.reject('El usuario ya existe')
		})
	,

	body('profileImg').custom((value, { req }) => {
		const file = req.file
		if (file && !files.isFileImage(file.originalname)) {
			throw new Error(`Ingrese un archivo que sea una imagen`)
		}
		return true
	})

]

module.exports = validations