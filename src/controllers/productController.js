const agregarProducto=require('../models/product')

const controller = {
  detail: (req, res) => {
    res.render('products/product-detail.ejs')
  },
  add: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create:(req,res) =>{
    let producto= req.body
    agregarProducto.create(producto)
    res.redirect('/product/list')
  },
  list: (req,res) =>{
    let products= agregarProducto.findAll()
    res.render('products/product-list.ejs' ,{ 'products': products })
  },
  edit: (req,res) =>{
    let id = req.body.id
    console.log(req.body.id)
    res.render('products/product-edit.ejs')
  },
}
    
    
    

module.exports = controller
