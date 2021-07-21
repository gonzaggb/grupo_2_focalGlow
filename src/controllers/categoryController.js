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

    category.dataValues.imageCover = categoryImagePath + category.imageCover

    let product = await Product.findAll({
      where: { categoryId: category.id },
      include: [{ association: 'images' }]

    })

    product.forEach(e => {
      e.images.forEach(e => {
        e.dataValues.name = productImagePath + e.name
      })
    })

    res.render('category.ejs', { category, product })
  },

  list: async (req, res) => {
    const categoryList = await Category.findAll();

    try {
      categoryList.forEach(e => {
        e.dataValues.imageCover = categoryImagePath + e.imageCover
        e.dataValues.imageHome = categoryImagePath + e.imageHome
      })
      res.render('categories/category-list.ejs', { categoryList })

    } catch (error) {
      console.log(error)
    }
  },

  detail: async (req, res) => {

    let category = await Category.findByPk(req.params.id)
    category.dataValues.imageCover = categoryImagePath + category.imageCover
    category.dataValues.imageHome = categoryImagePath + category.imageHome

    res.render('categories/category-detail.ejs', { category })
  },

  formNew: (req, res) => {
    res.render('categories/category-create.ejs')
  },

  create: async (req, res) => {
    let errors = validationResult(req)

    const categoryNew = req.body
    const { files } = req

    if (!errors.isEmpty()) {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })

      res.render('categories/category-create.ejs', { errors: errors.mapped(), old: req.body })
    } else {
      files.forEach(e => {
        e.fieldname == 'imageCover' ? categoryNew.imageCover = e.filename : categoryNew.imageHome = e.filename
      })

      await Category.create(categoryNew)
      return res.redirect('/category')
    }
  },

  edit: async (req, res) => {
    const category = await Category.findByPk(req.params.id)

    category.dataValues.imageCover = categoryImagePath + category.imageCover
    category.dataValues.imageHome = categoryImagePath + category.imageHome

    res.render('categories/category-edit.ejs', { category })
  },

  update: async (req, res) => {

    const categoryNew = req.body
    const { files } = req

    const categoryToUpdate = await Category.findByPk(req.params.id)
    if (!categoryToUpdate) {
      return res.send('Esa categoría no existe')
    }



    if (files.length > 0) {
      //Si vienen archivos de imagenes => borro las imagenes viejas del servidor y cambio el valor a la key
      files.forEach(e => {
        if (e.fieldname == 'imageCover') {
          categoryNew.imageCover = e.filename
          fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToUpdate.imageCover))
        }
        if (e.fieldname == 'imageHome') {
          categoryNew.imageHome = e.filename
          fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToUpdate.imageHome))
        }
      })
    } else { //Como no llegó nada debo indicarle que tome las imagenes viejas como actuales
      categoryNew.imageCover ? '' : categoryNew.imageCover = categoryToUpdate.imageCover
      categoryNew.imageHome ? '' : categoryNew.imageHome = categoryToUpdate.imageHome
    }

    await Category.update(categoryNew, {
      where: { id: categoryToUpdate.id }
    })

    return res.redirect('/category/detail/' + categoryNew.id)
  },

  delete: async (req, res) => {
    let categoryToDelete = await Category.findByPk(req.params.id)

    try {
      fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToDelete.imageCover))  // borra image Cover
      fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToDelete.imageHome))
      // borra home image
      await Category.destroy(
        { where: { id: req.params.id } })
    } catch (error) {
      console.log(error)
    }

    return res.redirect('/category')
  }

}

module.exports = controller
