//Middleware que en caso de estar logeado en session te redirige al detalle del usuario

module.exports = (req, res, next) => {
    const userSession = req.session.logged

    if (userSession) {
        return res.redirect(`/users/${userSession}/detail`)
    }
    next()
}