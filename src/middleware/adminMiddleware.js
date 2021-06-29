const userModel = require('../models/user')
module.exports = (req, res, next) => {
    const userSession = req.session.logged
    const userCategory = userModel.findByPk(userSession).category
    //valida que no exista session y en caso de existir sea distinta a admin
    if (!userSession || userCategory != 'admin') {
        console.log("El usuario no es admin, redirijo al login")
        return res.redirect('/users/login')
    }
    next()
}