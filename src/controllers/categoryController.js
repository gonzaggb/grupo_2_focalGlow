const categories = require('../models/category')
const products = require('../models/product')

const controller = {
  landing: (req, res) => {
    const name = req.params.categoryName
    let category = categories.findByName(name)
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
  },

  formNew: (req, res) => {
    res.render('categories/category-create.ejs')
  },

  edit: (req, res) => {
    let category = categories.findByPk(req.params.id)
    res.render('categories/category-edit.ejs', { category })
  },

  delete: (req, res) => {
    let category = categories.delete(req.params.id)


    return res.redirect('/category')
  },
  update: (req, res) => {

  }
}

module.exports = controller
