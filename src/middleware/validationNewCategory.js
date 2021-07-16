const { body } = require('express-validator')
const files = require('../helpers/files')
const categoryModel = require('../models/category')
const validations = [
	body('name')
		.notEmpty().withMessage('Debes ingresar el nombre de la categoría').bail()
		.isLength({ min: 5 }).withMessage('El nombre debe ser más largo')

		.custom((val) => {
			const categoryFound = categoryModel.findByField('name', val)
			if (categoryFound) {
				return false
			}
			return true
		}).withMessage('La categoría ya existe'),

	body('image_cover').custom((value, { req }) => {
		const file = req.files
		if (file && !files.isFileImage(file.originalname)) {
			throw new Error(`Ingrese un archivo que sea una imagen`)
		}
		return true
	}),
	body('iamger_home').custom((value, { req }) => {
		const file = req.files
		if (file && !files.isFileImage(file.originalname)) {
			throw new Error(`Ingrese un archivo que sea una imagen`)
		}
		return true
	})
]

module.exports = validations