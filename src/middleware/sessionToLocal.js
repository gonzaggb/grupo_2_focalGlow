//MIDDLEWARE QUE PASA SESSION TO LOCALS

const { User } = require('../database/models')

module.exports = async (req, res, next) => {


	if (req.session.logged) {
		try {
			const userFound = await User.findByPk(req.session.logged)
			delete userFound.password
			res.locals.user = userFound

		} catch (error) {
			console.log(error)
			return res.redirect('/500')
		}
	}
	next()
}
