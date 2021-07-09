const categories = require('../models/category')
const products = require('../models/product')

const controller = {
  category: (req, res) => {
    const name = req.params.id
    let category = categories.findByPk(name)
    let product = products.filterByCategory(category.name)
    let dataCategory = { category, product }
    res.render('category.ejs', { dataCategory })
  },

  list: (req, res) => {
    const categoryList = categories.findAll();
    res.render('categories/categoriesList.ejs', { categoryList })
  },

  detail: (req, res) => {

    res.render('categoryDetail.ejs', { category })
  }
}

module.exports = controller
