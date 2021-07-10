const categories = require('../models/category')
const products = require('../models/product')
const db = require('../database/models')

const controller = {
  //FIXME PRODUCT 
  category: (req, res) => {
    const name = req.params.id
    let category = categories.findByPk(name)
    let product = products.filterByCategory(category.name)
    let dataCategory = { category, product }
    res.render('category.ejs', { dataCategory })
  } 
}

module.exports = controller
