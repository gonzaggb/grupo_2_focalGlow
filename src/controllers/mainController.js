const { Category } = require('../database/models')
const { Product } = require('../database/models')
const random = require('../helpers/utilities')
const path = require('path')
const pathImageCategories = '/img/categories/'
const productImagePath = '/img/'

function addProductImagePath(element) {
  return element.dataValues.name = productImagePath + element.name
}


const SALEIMAGES = 4 // cantidad de imagenes que se muestran en la parte de SALE

const controller = {

  home: async (req, res) => {

    const products = await Product.findAll({
      include: [{ association: 'category' },
      {
        association: 'images',
        where: { type: 'main' },
      }]
    })

    products.forEach(product => {
      product.images.forEach(image => {
        addProductImagePath(image)
      })
    })

    let productsQty = products.length
    const randomArray = random.randomArray(SALEIMAGES, productsQty)

    let categoryList = await Category.findAll()
    categoryList.forEach(category => {
      category.dataValues.imageCover = path.join(pathImageCategories, category.imageCover)
      category.dataValues.imageHome = path.join(pathImageCategories, category.imageHome)
    });


    res.render('home.ejs', { products, categoryList, randomArray }) // paso al html el array
  },
  checkout: (req, res) => {
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
    res.render('checkout.ejs', { productCheckout })
  },
  us: (req, res) => {
    res.render('us.ejs')
  },
}

module.exports = controller
