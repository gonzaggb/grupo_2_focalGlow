const { User } = require('../database/models')

module.exports = async (req, res, next) => {


	if (req.session.logged) {
		const userFound = await User.findByPk(req.session.logged)
			
				//delete userFound.password -> porque está comentado? @gonza //FIXME 
				
				res.locals.user = userFound
	}
	next()	
}
	