//const userModel = require('../models/user')
const { User } = require('../database/models')
const { findUser } = require('../models/user')

module.exports = (req, res, next) => {
	//FIXME
	const userSession = req.session.logged


	User.findByPk(userSession)
		.then((user) => {
			if (!userSession || user.role != 'admin') {
				return res.redirect('/users/login')
			}
			return next()
		})


}


	//valida que no exista session y en caso de existir sea distinta a admin
