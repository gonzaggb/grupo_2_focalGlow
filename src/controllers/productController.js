//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')
// se requiere express-validator, pero la parte de validation result
const {validationResult}= require('express-validator')

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
    res.render('products/product-detail.ejs', { productFound, similarProducts })
  },
  formNew: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create: (req, res) => {
    let errors = validationResult(req)
    if(errors.isEmpty()){
      const productNew = req.body
    const files = req.files

    console.log(files)
    product.create(productNew, files)
    res.redirect('/product/list')
    } else {
      res.render('products/product-create.ejs', { errors: errors.array()})
    } 
    console.log(errors)     
    
    
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
    let {files} = req
   
    
    console.log(data)
    return
    product.update(data, id)
    res.redirect('/product/list')
  },

  delete: (req, res) => {
    let id = req.params.id
    let productDelet = product.delete(id)
    res.redirect('/product/list')
  },
}

module.exports = controller
