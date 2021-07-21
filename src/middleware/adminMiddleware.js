const { User } = require('../database/models')

module.exports = async (req, res, next) => {

	const userSession = req.session.logged
	const user = await User.findByPk(userSession)

	if (!userSession || user.role != 'admin') {
		return res.redirect('/users/login')
	}
	return next()

}


	//valida que haya un usuario en session y en caso de existir que sea admin
