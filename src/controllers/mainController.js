
const agregarProducto=require('../models/product')
const categories = require('../models/category')

const controller = {
  home: (req, res) => {
    let products= agregarProducto.findAll()
    let categoryList = categories.findAll()
    let homeData= {products, categoryList}
    
    res.render('home.ejs',{ homeData })
  
    

  },
  checkout: (req, res) => {
    res.render('checkout.ejs', { productCheckout: productCheckout })
  },
  us: (req, res) => {
    res.render('us.ejs')
  },
}

module.exports = controller
