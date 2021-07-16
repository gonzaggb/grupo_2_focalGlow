const categories = require('../models/category')
const products = require('../models/product')
const { validationResult } = require('express-validator')
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
    //let errors = validationResult(req)
    const categoryNew = req.body
    const { files } = req
    files.forEach(e => {
      e.fieldname == 'image_cover' ? categoryNew.image_cover = '/img/categories/' + e.filename : categoryNew.image_home = '/img/categories/' + e.filename
    })


    categories.create(categoryNew)
    return res.redirect('/category')


    if (errors.isEmpty()) {
      categories.create(categoryNew, files)
      res.redirect('/category')
    } else {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })
      res.render('category/category-create.ejs', { errors: errors.mapped(), old: req.body })
    }
  },

  edit: (req, res) => {
    let category = categories.findByPk(req.params.id)
    res.render('categories/category-edit.ejs', { category })
  },

  delete: (req, res) => {
    let categoryToDelete = categories.findByPk(req.params.id)


    const resourcesPath = path.join(__dirname, '../../public')

    fs.unlinkSync(path.join(resourcesPath, categoryToDelete.image_cover))  // borra image Cover
    fs.unlinkSync(path.join(resourcesPath, categoryToDelete.image_home))
    // borra home image

    categories.delete(req.params.id)
    return res.redirect('/category')
  },

  update: (req, res) => {

  }
}

module.exports = controller
