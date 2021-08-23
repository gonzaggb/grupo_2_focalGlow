const { body } = require('express-validator')
const files = require('../helpers/files')
const { User } = require('../database/models')
const bcrypt = require('bcryptjs')


const validations = [

	body('oldPassword')
		.notEmpty()
		.withMessage('Por favor ingrese su password actual')
		.bail()
		.custom(async (value, { req }) => {
			const { id } = req.params
			let userFound = await User.findByPk(id)

			let passwordMatch = bcrypt.compareSync(value, userFound.password)
			if (passwordMatch) {
				return true
			}

			throw new Error('La contraseña actual es inválida')
		}),



	body('password').notEmpty().withMessage(`Debes introducir una contraseña nueva`),

	body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña nueva'),

	body('rePassword').custom((val, { req }) => {
		let password = req.body.password
		if (val != password) {
			throw new Error(`Las contraseñas deben coincidir`)
		}
		return true
	}),



]

module.exports = validations