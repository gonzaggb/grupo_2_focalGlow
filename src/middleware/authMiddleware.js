//Validación para que si no hay session te lleve al login

module.exports = (req, res, next) => {
    const userSession = req.session.logged


    if (!userSession) {

        return res.redirect('/users/login')
    }
    next()
}