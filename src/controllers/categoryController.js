const categories = require('../models/category')
const products = require('../models/product')
const { Category } = require('../database/models')
const { Product } = require('../database/models')

const { validationResult } = require('express-validator')
const fs = require('fs')
const path = require('path')
const categoryImagePath = '/img/categories/'
const productImagePath = '/img/'



const controller = {
  landing: async (req, res) => {

    const name = req.params.name
    let category = await Category.findOne({ where: { name: name } })
    let product = await Product.findAll({
      where: { categoryId: category.id },
      include: [{ association: 'images' }]

    })
    //res.send(product)
    res.render('category.ejs', { category, product, categoryImagePath, productImagePath })
  },

  list: async (req, res) => {
    const categoryList = await Category.findAll();

    res.render('categories/category-list.ejs', { categoryList, categoryImagePath })
  },

  detail: async (req, res) => {

    let category = await Category.findByPk(req.params.id)

    res.render('categories/category-detail.ejs', { category, categoryImagePath })
  },

  formNew: (req, res) => {
    res.render('categories/category-create.ejs')
  },

  create: (req, res) => {
    let errors = validationResult(req)

    const categoryNew = req.body
    const { files } = req


    if (errors.isEmpty()) {
      files.forEach(e => {
        e.fieldname == 'image_cover' ? categoryNew.image_cover = '/img/categories/' + e.filename : categoryNew.image_home = '/img/categories/' + e.filename
      })
      categories.create(categoryNew, files)
      res.redirect('/category')
    } else {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })
      res.render('categories/category-create.ejs', { errors: errors.mapped(), old: req.body })
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
