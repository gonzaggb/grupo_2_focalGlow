const categories = require('../models/category')
const products = require('../models/product')
const fs = require('fs')
const path = require('path')

const controller = {
  landing: (req, res) => {
    const id = req.params.id
    const name = req.params.name
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

  create: (req, res) => {

  },

  edit: (req, res) => {
    let category = categories.findByPk(req.params.id)
    res.render('categories/category-edit.ejs', { category })
  },

  delete: (req, res) => {
    let categoryToDelete = categories.findByPk(req.params.id)


    const resourcesPath = path.join(__dirname, '../../public')

    fs.unlinkSync(path.join(resourcesPath, categoryToDelete.imageCover))  // borra image Cover
    fs.unlinkSync(path.join(resourcesPath, categoryToDelete.homeImage))
    // borra home image

    categories.delete(req.params.id)
    return res.redirect('/category')
  },
  update: (req, res) => {

  }
}

module.exports = controller
