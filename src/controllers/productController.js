//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')

const controller = {
  detail: (req, res) => {
    let id = req.params.id
    let productDetail = product.findByPk(id)
    res.render('products/product-detail.ejs', { productDetail })
  },
  add: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create: (req, res) => {
    let productUpdate = req.body
    product.create(productUpdate)
    res.redirect('/product/list')
  },
  list: (req, res) => {
    let products = product.findAll()
    res.render('products/product-list.ejs', { products: products })
  },
  edit: (req, res) => {
    let id = req.body.id
    let productDetail = product.findByPk(id)
    res.render('products/product-edit.ejs', { productDetail })
  },
  delete: (req, res) => {
    //guardo la variable del id del articulo a borrar
    let id = req.params.id

    //llamo al modelo para que borre al articulo por su id
    product.delete(id)

    //retorno la lista de productos actualizada
    let products = product.findAll()
    res.render('products/product-list.ejs', { products: products })
  },
}

module.exports = controller
