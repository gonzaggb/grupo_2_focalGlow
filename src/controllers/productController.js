const agregarProducto=require('../models/product')

const controller = {
  detail: (req, res) => {
    res.render('products/product-detail.ejs')
  },
  add: (req, res) => {
    res.render('products/product-create.ejs')
  },
  create:(req,res) =>{       
        const product = req.body;
        const productCreated = agregarProducto.create(product);
    res.redirect('/product/list')
  },
  list: (req,res) =>{
    let products= agregarProducto.findAll()
    res.render('products/product-list.ejs' ,{ 'products': products })
  },

  edit:(req,res) =>{
    let id = req.params.id
    let productFound= agregarProducto.findByPk(id)
    res.render('products/product-edit.ejs',{ 'productFound': productFound } )

  },
  update:(req,res) =>{
    let data = req.body
    let id = req.params.id
    agregarProducto.update(data,id)
    res.redirect('/product/list')
  },

  
  delete:(req,res) =>{
    let id =req.params.id
    let productDelet = agregarProducto.delete(id)
    res.redirect('/product/list')
  },
  
}
    
    
    

module.exports = controller
