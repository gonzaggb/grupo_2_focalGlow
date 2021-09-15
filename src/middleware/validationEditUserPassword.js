//MIDDLEWARE CON EXPRESS VALIDATOR PARA CHEQUEAR LOS DISTINTOS CAMPOS DEL FORMULARIO DE CAMBIO DE CONTRASEÑA

const { body } = require('express-validator')
const { User } = require('../database/models')
const bcrypt = require('bcryptjs')


const validations = [

	body('oldPassword')
		.notEmpty()
		.withMessage('Por favor ingrese su password')
		.bail()
		.custom(async (value, { req }) => {
			const { id } = req.params
			let userFound = await User.findByPk(id)

			//COMPARA LAS PASSWORD
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