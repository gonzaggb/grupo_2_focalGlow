const { body } = require('express-validator')
const { Category } = require('../database/models')
const { checkFieldImage } = require('../helpers/checkFilesForEdit')

const validations = [
	body('name')
		.notEmpty().withMessage('Debes ingresar el nombre de la categoría').bail()
		.isLength({ min: 3 }).withMessage('El nombre debe ser más largo')

		.custom(async (val, { req }) => {
			const categoryFound = await Category.findOne({ where: { name: val } })

			if (categoryFound && categoryFound.id != req.params.id) {
				throw new Error('La categoría ya existe')
			}
			return true
		}),


	//Para las imagenes y pdf llamamos a una funcion auxiliadora
	body('imageCover').custom((value, { req }) => {
		const { files } = req
		checkFieldImage('imageCover', files)
		return true
	}),
	body('imageHome').custom((value, { req }) => {
		const { files } = req
		checkFieldImage('imageHome', files)
		return true
	}),




]

module.exports = validations