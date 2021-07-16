const categories = require('../models/category')

module.exports = (req, res, next) => {
    //FIXME
    res.locals.categories = categories.findAll()
    next()
}
