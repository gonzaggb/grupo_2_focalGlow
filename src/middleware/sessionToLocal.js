const { User } = require('../database/models')

module.exports = async (req, res, next) => {


	if (req.session.logged) {
		//FIXME
		console.log(req.session.logged)
		const userFound = await User.findByPk(req.session.logged)
			
				//delete userFound.password
				
				res.locals.user = userFound
			}

	next()
	}
	


/*
const user = require('../models/user')
module.exports = (req, res, next) => {

    if (req.session.logged){
        //FIXME
        let userFound = user.findByPk(req.session.logged)
        delete userFound.password
        res.locals.user = userFound
        
    }
    next()
}
*/