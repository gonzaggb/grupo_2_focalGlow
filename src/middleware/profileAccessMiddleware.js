//MIDDLEWARE PARA DAR ACCESO AL EDITAR EL PERFIL DEPENDIENDO SI ES EL USUARIO DEL PERFIL O ADMINISTRADOR


const { User } = require('../database/models')

module.exports = async (req, res, next) => {

	const userSession = req.session.logged

	const { id, role } = await User.findByPk(userSession)

	if ((userSession && role == 'admin') || (id == req.params.id)) {
		return next()
	}

	return res.redirect('/')

}
