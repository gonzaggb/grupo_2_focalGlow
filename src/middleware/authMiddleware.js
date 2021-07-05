module.exports = (req, res, next) => {
    const userSession = req.session.logged

    //valida que no exista sesion
    if (!userSession) {

        return res.redirect('/users/login')
    }
    next()
}