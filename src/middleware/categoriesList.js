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
