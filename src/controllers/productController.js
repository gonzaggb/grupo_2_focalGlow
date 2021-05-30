const agregarProducto=require('../models/product')

const controller = {
  detail: (req, res) => {
    res.render('products/product-detail.ejs')
  },
  add: (req, res) => {
    res.render('products/product-org.ejs')
  },
  create:(req,res) =>{
    let producto= req.body
    agregarProducto.create(producto)
    res.redirect('/product/add')
  }
}
    
    
    

module.exports = controller
