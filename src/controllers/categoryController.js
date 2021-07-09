const categories = require('../models/category')
const products = require('../models/product')

const controller = {
  landing: (req, res) => {
    const id = req.params.id
    let category = categories.findByPk(id)
    let product = products.filterByCategory(category.name)
    let dataCategory = { category, product }
    res.render('category.ejs', { dataCategory })
  },

  list: (req, res) => {
    const categoryList = categories.findAll();
    res.render('categories/category-list.ejs', { categoryList })
  },

  detail: (req, res) => {
    let category = categories.findByPk(req.params.id)

    res.render('categories/category-detail.ejs', { category })
  }
}

module.exports = controller
