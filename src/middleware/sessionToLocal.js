const { User } = require('../database/models')

module.exports = async (req, res, next) => {

	//TODO ACA HAY QUE CACHEAR PARA QUE NO VAYA TODO EL TIEMPO A BUSCAR A LA BASE DE DATOS

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
