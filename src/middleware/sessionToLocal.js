//const user = require('../models/user')
const { User } = require('../database/models')

module.exports = (req, res, next) => {

	if (req.session.logged) {
		//FIXME
		console.log(req.session.logged)
		User.findByPk(req.session.logged)
			.then(userFound => {
				console.log('Soy la promesa ' + userFound)
				//delete userFound.password
				res.locals.user = userFound
			})


	}
	next()
}