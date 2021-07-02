//MIDDLEWARE PARA DAR ACCESO AL EDITAR EL PERFIL DEPENDIENDO SI ES EL USUARIO DEL PERFIL O ADMINISTRADOR

const userModel = require('../models/user')

module.exports = (req, res, next) => {
    const userSession = req.session.logged

    const { id, category } = userModel.findByPk(userSession)


    if (userSession && category == 'admin') {
        //Si es un administrador puede entrar a cualquier perfil
        return next()
    } else if (id == req.params.id) {
        //Si es un usuario sólo puede entrar a su perfil
        return next()
    } else {
        return res.redirect('/')
    }
    next()
}