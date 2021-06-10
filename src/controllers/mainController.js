//Esto esta aca como para tener unos datos que enviar al checkout. NO va aca.
let productCheckout = [
  {
    id: 1,
    nombre: 'Lampara',
    categoria: 'Plafon',
    marca: 'Focal Glow',
    potencia: '20W',
    cct: '3000K',
    precio: 1000,
    dim: 'bluetooth',
    cantidad: 2,
  },
  {
    id: 2,
    nombre: 'Reflector',
    categoria: 'Exterior',
    marca: 'Disney',
    potencia: '100W',
    cct: '2000K',
    precio: 1000,
    dim: 'click',
    cantidad: 1,
  },
  {
    id: 3,
    nombre: 'Velador',
    categoria: 'Interior',
    marca: 'Focal Glow',
    potencia: '100W',
    cct: '2000K',
    precio: 1500,
    dim: 'click',
    cantidad: 5,
  },
]
const agregarProducto = require('../models/product')
const categories = require('../models/category')

const controller = {
  home: (req, res) => {
    let products = agregarProducto.findAll()
    let categoryList = categories.findAll()
    let homeData = { products, categoryList }

    res.render('home.ejs', { homeData })
  },
  checkout: (req, res) => {
    res.render('checkout.ejs', { productCheckout: productCheckout })
  },
  us: (req, res) => {
    res.render('us.ejs')
  },
}

module.exports = controller
