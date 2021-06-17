//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')
// se requiere express-validator, pero la parte de validation result
const { validationResult } = require('express-validator')
const { isFileImage, isPdf } = require('../helpers/files')

const fs = require('fs')
const path = require('path')

const controller = {
  list: (req, res) => {
    let products = product.findAll()
    res.render('products/product-list.ejs', { products: products })
  },
  detail: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)
    let category = productFound.category
    let similarProducts = product.filterByCategory(category)

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }

    let numberSimilarProducts = Math.min(similarProducts.length, 3) //determino cuantos productos similares voy a pasar a la vista. 4 como máximo
    let max = similarProducts.length //maximo numero del array de Similiar Products
    const randomArray = [getRandomInt(0, max)] // saco un numero random

    //Creo un array de numeros random que no se repitan
    for (i = 0; i < numberSimilarProducts; i++) {
      let randomNumber = getRandomInt(0, max)
      !randomArray.includes(randomNumber) ? randomArray.push(randomNumber) : ''
    }

    //filtro los Similar Products de forma aleatoria
    let similarProductsFiltered = similarProducts.filter((e, index) => randomArray.includes(index))

    res.render('products/product-detail.ejs', { productFound, similarProductsFiltered })
  },
  formNew: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      const productNew = req.body
      const files = req.files
      product.create(productNew, files)
      res.redirect('/product/list')
    } else {

      res.render('products/product-create.ejs',{errors: errors.mapped(), old: req.body})
    }
  },

  edit: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)

    res.render('products/product-edit.ejs', { productFound: productFound })
  },
  update: (req, res) => {
    let data = req.body
    let id = req.params.id
    let productOriginal = product.findByPk(id)
    let { files } = req
    data.main_image = productOriginal.main_image
    data.image_slider_1 = productOriginal.image_slider_1
    data.image_slider_2 = productOriginal.image_slider_2
    data.image_slider_3 = productOriginal.image_slider_3
    data.data_sheet = productOriginal.data_sheet
    data.install_sheet = productOriginal.install_sheet
    for (let i = 0; i < files.length; i++) {
      switch (files[i].fieldname) {
        case 'main_image':
          data.main_image = ('/img/' + files[i].filename)

          break
        case 'image_slider_1':
          data.image_slider_1 = ('/img/' + files[i].filename)

          break
        case 'image_slider_2':
          data.image_slider_2 = ('/img/' + files[i].filename)
          break
        case 'image_slider_3':
          data.image_slider_3 = ('/img/' + files[i].filename)
          break
        case 'data_sheet':

          data.data_sheet = ('/pdf/' + files[i].filename)

          break
        case 'install_sheet':

          data.install_sheet = ('/pdf/' + files[i].filename)

          break
        default:
      }
    }
    product.update(data, id)
    res.redirect('/product/list')
  },



  delete: (req, res) => {
    let id = req.params.id
    let productDelet = product.findByPk(id)
    res.redirect('/product/list')
    product.delete(id)


  },
}

module.exports = controller
