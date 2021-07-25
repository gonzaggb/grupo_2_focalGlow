module.exports = (req, res, next) => {
    const userCookie = req.signedCookies.userId
    if (userCookie) {
        req.session.logged = userCookie
    }
    next()
}
