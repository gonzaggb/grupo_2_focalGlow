module.exports = (req, res, next) => {
    const userSession = req.session.logged
    if (!userSession) {
        console.log('aca estoy')
        res.redirect('/users/login')
        return
    }
    next()
}