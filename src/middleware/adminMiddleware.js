const userModel = require('../models/user')
module.exports = (req, res, next) => {
    //FIXME
    const userSession = req.session.logged
    const userCategory = userModel.findByPk(userSession).category
    //valida que no exista session y en caso de existir sea distinta a admin
    if (!userSession || userCategory != 'admin') {

        return res.redirect('/users/login')
    }
    next()
}