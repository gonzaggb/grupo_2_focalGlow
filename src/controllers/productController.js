//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')

const controller = {
  list: (req, res) => {
    let products = product.findAll()
    res.render('products/product-list.ejs', { products: products })
  },
  detail: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)
    res.render('products/product-detail.ejs', { productFound })
  },

  formNew: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create: (req, res) => {
    const product = req.body
    const productCreated = product.create(product)
    res.redirect('/product/list')
  },

  edit: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)
    res.render('products/product-edit.ejs', { productFound: productFound })
  },
  update: (req, res) => {
    let data = req.body
    let id = req.params.id
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
