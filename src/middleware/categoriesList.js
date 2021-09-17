//Comparte la lista de categoria a todo el proyecto para ser utilizado en el header (partials)

const { Category } = require('../database/models')

module.exports = async (req, res, next) => {
	try {
		res.locals.categories = await Category.findAll()
		next()

	} catch (error) {
		console.log(error)
		return res.redirect('/500')
	}
}
