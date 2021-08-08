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

    try {
      let category = await Category.findOne({ where: { name: name } })

      category.dataValues.imageCover = categoryImagePath + category.imageCover

      let products = await Product.findAll({
        where: { categoryId: category.id },
        include: [{ association: 'images', where: { type: 'main' } }]
      })

      products.forEach(product => {
        product.images.forEach(image => {
          image.dataValues.name = productImagePath + image.name
        })
      })

      res.render('category.ejs', { category, products })

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },

  list: async (req, res) => {
    try {
      const categoryList = await Category.findAll();

      categoryList.forEach(category => {
        category.dataValues.imageCover = categoryImagePath + category.imageCover
        category.dataValues.imageHome = categoryImagePath + category.imageHome
      })
      res.render('categories/category-list.ejs', { categoryList })

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },

  detail: async (req, res) => {
    try {
      let category = await Category.findByPk(req.params.id)

      category.dataValues.imageCover = categoryImagePath + category.imageCover
      category.dataValues.imageHome = categoryImagePath + category.imageHome

      res.render('categories/category-detail.ejs', { category })

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
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
      files.forEach(file => {
        fs.unlinkSync(file.path)
      })

      res.render('categories/category-create.ejs', { errors: errors.mapped(), old: req.body })
    }

    files.forEach(file => {
      file.fieldname == 'imageCover' ? categoryNew.imageCover = file.filename : categoryNew.imageHome = file.filename
    })

    try {
      await Category.create(categoryNew)

      return res.redirect('/category')

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }

  },

  edit: async (req, res) => {

    try {
      const category = await Category.findByPk(req.params.id)

      category.dataValues.imageCover = categoryImagePath + category.imageCover
      category.dataValues.imageHome = categoryImagePath + category.imageHome

      res.render('categories/category-edit.ejs', { category })
    }
    catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },

  update: async (req, res) => {

    let errors = validationResult(req)
    //res.send(errors)

    const categoryNew = req.body
    const { files } = req

    if (!errors.isEmpty()) {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(file => {
        fs.unlinkSync(file.path)
      })
      try {
        const category = await Category.findByPk(req.params.id)
        category.dataValues.imageCover = categoryImagePath + category.imageCover
        category.dataValues.imageHome = categoryImagePath + category.imageHome

        res.render('categories/category-edit.ejs', { errors: errors.mapped(), old: req.body, category })
      } catch (error) {
        console.log(error)
        return res.redirect('/500')
      }
    }

    try {
      const categoryToUpdate = await Category.findByPk(req.params.id)

      if (files.length > 0) {
        //Si vienen archivos de imagenes => borro las imagenes viejas del servidor y cambio el valor a la key
        files.forEach(file => {
          if (file.fieldname == 'imageCover') {
            categoryNew.imageCover = file.filename
            fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToUpdate.imageCover))
          }
          if (file.fieldname == 'imageHome') {
            categoryNew.imageHome = file.filename
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

    } catch (error) {
      console.log(error)

      return res.redirect('/500')
    }
  },

  delete: async (req, res) => {

    try {
      let categoryToDelete = await Category.findByPk(req.params.id)
      //Borro Imagenes de Cover y home del servidor
      fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToDelete.imageCover))
      fs.unlinkSync(path.join(__dirname, '../../public', categoryImagePath, categoryToDelete.imageHome))

      await Category.destroy(
        { where: { id: req.params.id } })


      return res.redirect('/category')

    } catch (error) {
      console.log(error)

      return res.redirect('/500')
    }
  }

}

module.exports = controller
