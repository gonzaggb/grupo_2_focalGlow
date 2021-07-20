const { Category } = require('../database/models')

module.exports = async (req, res, next) => {
    //FIXME
    res.locals.categories = await Category.findAll()
    next()
}
