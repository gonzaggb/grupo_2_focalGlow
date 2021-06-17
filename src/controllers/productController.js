//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')
// se requiere express-validator, pero la parte de validation result
const {validationResult}= require('express-validator')
const fs = require('fs')
const path = require('path')

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
        product.create(productNew, files)
        res.redirect('/product/list')
    } else {
      res.render('products/product-create.ejs',
       { errors: errors.array(),
         old: req.body})
    } 
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
    
    //
    for (let i = 0; i < files.length; i++) {
      switch (files[i].fieldname) {
        case 'main_image':
          if (undefined) {
            data.main_image = productOriginal.main_image
          } else {
            data.main_image = ('/img/' + files[i].filename)
          }
          break
        case 'image_slider':  
        if (undefined) {
            data.image_slider = productOriginal.image_slider
          }else{
              

             files.forEach((e ,index) => {
               console.log(productOriginal.image_slider[index])
               e ? e = ('/img/' + e.filename) : productOriginal.image_slider[index] ;
             }); 
             
        
         /*  files[i][0] ? data.image_slider[0] = ('/img/' + files[i][0].filename) : productOriginal.imageSlider[0];
          files[i][1] ?  data.image_slider[1] = ('/img/' + files[i][1].filename) : productOriginal.imageSlider[1];
          files[i][2] ?  data.image_slider[2] = ('/img/' + files[i][2].filename) : productOriginal.imageSlider[2]; */
          }  
         

        
          
          break
        case 'image_dimension':
          if (undefined) {
            data.image_dimension = productOriginal.image_dimension
          } else {
            data.image_dimension = ('/img/' + files[i].filename)
          }
          break
        case 'data_sheet':
          if (undefined) {
            data.image_dimension = productOriginal.image_dimension
          } else {
            data.image_dimension = ('/pdf/' + files[i].filename)
          }
          break
        case 'install_sheet':
          if (undefined) {
            data.install_sheet = productOriginal.install_sheet
          } else {
            data.install_sheet = ('/pdf/' + files[i].filename)
          }
          break
        default:
      }

    
   
    
    }
    product.update(data, id)
    res.redirect('/product/list')
  },

  delete: (req, res) => {
    let id = req.params.id
    let productDelet = product.findByPk(id)
    
    fs.unlinkSync(path.join(__dirname, '../../public/', productDelet.main_image))
    fs.unlinkSync(path.join(__dirname, '../../public/', productDelet.image_dimension))
    fs.unlinkSync(path.join(__dirname, '../../public/', productDelet.data_sheet))
    fs.unlinkSync(path.join(__dirname, '../../public/', productDelet.install_sheet))
    
    res.redirect('/product/list')
    product.delete(id)
    
    
  },
}

module.exports = controller
