const agregarProducto = require('../models/product')
const categories = require('../models/category')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


const saleImages = 4 // cantidad de imagenes que se muestran en la parte de SALE

const controller = {
  home: (req, res) => {
    const max = agregarProducto.findAll().length // defino el número máximo del array
    const randomArray = [getRandomInt(0, max)] //defino un array random
    for (i = 0; i < saleImages; i++) { // itero tantas veces como imagenes se van a mostrar
      const randomNumber = getRandomInt(0, max) // defino el numero random a evaluar
      if (!randomArray.includes(randomNumber)){ // si el random no se incluye en el randomArray 
        randomArray.push(randomNumber) // lo guardo
      }
    }
    let products = agregarProducto.findAll()
    let categoryList = categories.findAll()
    let homeData = { products, categoryList }

    res.render('home.ejs', { homeData,randomArray }) // paso al html el array
  },
  checkout: (req, res) => {
    res.render('checkout.ejs', { productCheckout })
  },
  us: (req, res) => {
    res.render('us.ejs')
  },
}

module.exports = controller
