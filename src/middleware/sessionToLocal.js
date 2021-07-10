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