const { body } = require('express-validator')
const files = require('../helpers/files')
const categoryModel = require('../models/category')
const { checkFieldImage } = require('../helpers/checkFiles')

const validations = [
	body('name')
		.notEmpty().withMessage('Debes ingresar el nombre de la categoría').bail()
		.isLength({ min: 5 }).withMessage('El nombre debe ser más largo')

		.custom((val) => {
			const categoryFound = categoryModel.findByName(val)

			if (categoryFound) {
				return false
			}
			return true
		}).withMessage('La categoría ya existe'),

	//Para las imagenes y pdf llamamos a una funcion auxiliadora
	body('image_cover').custom((value, { req }) => {
		const { files } = req
		checkFieldImage('image_cover', files)
		return true
	}),
	body('image_home').custom((value, { req }) => {
		const { files } = req
		checkFieldImage('image_cover', files)
		return true
	}),

]

module.exports = validations