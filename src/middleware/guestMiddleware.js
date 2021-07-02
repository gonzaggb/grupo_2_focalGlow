module.exports = (req, res, next) => {
    const userSession = req.session.logged
    //valida que exista session
    if (userSession) {
        return res.redirect(`/users/${userSession}/detail`)
    }
    next()
}