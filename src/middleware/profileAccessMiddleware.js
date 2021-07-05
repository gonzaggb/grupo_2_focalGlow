//MIDDLEWARE PARA DAR ACCESO AL EDITAR EL PERFIL DEPENDIENDO SI ES EL USUARIO DEL PERFIL O ADMINISTRADOR

const userModel = require('../models/user')

module.exports = (req, res, next) => {
    const userSession = req.session.logged

    const { id, category } = userModel.findByPk(userSession)



    if ((userSession && category == 'admin') || (id == req.params.id)) {
        return next()
    }

    return res.redirect('/')

}
