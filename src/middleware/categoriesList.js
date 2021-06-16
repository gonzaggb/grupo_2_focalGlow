const categories = require('../models/category')

module.exports = (req, res, next) => {
    res.locals.categories = categories.findAll()
    next()
}
