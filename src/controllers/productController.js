//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')
// se requiere express-validator, pero la parte de validation result
const { validationResult } = require('express-validator')
//funciones Auxilliares
//const { isFileImage, isPdf } = require('../helpers/files')
const { randomArray2 } = require('../helpers/utilities')


const fs = require('fs')
const path = require('path')
const { Console } = require('console')

const controller = {
  //FIXME READ
  list: (req, res) => {
    let products = product.findAll()
    res.render('products/product-list.ejs', { products: products })
  },
  //FIXME  READ
  detail: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)
    let category = productFound.category
    //Traigo todos los productos que están en la misma categoría
    let productsCategory = product.filterByCategory(category)

    //A los productos de la misma categoría le saco el que estoy viendo en detalle. Para que no me lo ponga como producto similar
    let similarProducts = productsCategory.filter((e) => e.id != id)
    //utilizando una funcion auxiliar creo un array de numeros aleatorios con maximo 3 posiciones
    let indexArray = randomArray2(similarProducts.length, 3)

    //filtro los Similar Products de forma aleatoria
    let similarProductsFiltered = similarProducts.filter((e, index) => indexArray.includes(index))

    res.render('products/product-detail.ejs', { productFound, similarProductsFiltered })
  },
  formNew: (req, res) => {
    res.render('products/product-create.ejs')
  },
  //FIXME CREATE PRODUCT 
  create: (req, res) => {
    let errors = validationResult(req)
    const productNew = req.body
    const { files } = req
    if (errors.isEmpty()) {
      product.create(productNew, files)
      res.redirect('/product')
    } else {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })
      res.render('products/product-create.ejs', { errors: errors.mapped(), old: req.body })
    }
  },
  //FIXME FORM UPDATE
  edit: (req, res) => {
    let id = req.params.id
    let productFound = product.findByPk(id)
    let errors = validationResult(req)
    res.render('products/product-edit.ejs', { productFound: productFound })
  },
  //FIXME UPDATE PRODUCT
  update: (req, res) => {
    let errors = validationResult(req)
    let id = req.params.id
    let productFound = product.findByPk(id)
    let { files } = req

    if (errors.isEmpty()) {
      let id = req.params.id
      let data = req.body
      let productOriginal = product.findByPk(id)
      data.image_slider = []
      data.main_image = productOriginal.main_image
      data.image_slider1 = productOriginal.image_slider1
      //data.image_slider.push(productOriginal.image_slider_1)
      data.image_slider2 = productOriginal.image_slider2
      // data.image_slider.push(productOriginal.image_slider_2)
      data.image_slider3 = productOriginal.image_slider3
      // data.image_slider.push(productOriginal.image_slider_3)
      data.data_sheet = productOriginal.data_sheet

      data.install_sheet = productOriginal.install_sheet

      data.image_dimension = productOriginal.image_dimension

      typeof data.power === Number ? (data.power = [data.power]) : ''
      typeof data.cct === Number ? (data.cct = [data.cct]) : ''
      typeof data.optic === 'string' ? (data.optic = [data.optic]) : ''
      typeof data.dim === 'string' ? (data.dim = [data.dim]) : ''
      for (let i = 0; i < files.length; i++) {
        switch (files[i].fieldname) {
          case 'main_image':
            data.main_image = '/img/' + files[i].filename
            break
          case 'image_slider1':
            data.image_slider1 = '/img/' + files[i].filename
            //data.image_slider[0] = data.image_slider_1
            break
          case 'image_slider2':
            data.image_slider2 = '/img/' + files[i].filename
            //data.image_slider[1] = data.image_slider_2
            break
          case 'image_slider3':
            data.image_slider3 = '/img/' + files[i].filename
            //data.image_slider[2] = data.image_slider_3
            break
          case 'data_sheet':
            data.data_sheet = '/pdf/' + files[i].filename
            break
          case 'install_sheet':
            data.install_sheet = '/pdf/' + files[i].filename
            break
          case 'image_dimension':
            data.image_dimension = '/img/' + files[i].filename
            break
          default:
        }
      }
      product.update(data, id)
      res.redirect('/product/')
    } else {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la edicion del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })
      res.render('products/product-edit.ejs', { errors: errors.mapped(), productFound })
    }
  },
  //FIXME DESTROY PRODUCT
  delete: (req, res) => {
    let id = req.params.id
    productToDelete = product.findByPk(id)
    product.delete(id)
    /*ELIMINO TODAS LOS ARCHIVOS ASOCIADOS*/
    /*CODIGO COMENTADO PARA EVITAR CONFLICTOS, YA QUE LAS IMAGENES ESTAN COMPARTIDAS ACTUALMENTE ENTRE PRODUCTOS*/
    /*         const resourcesPath = path.join(__dirname, '../../public')
            fs.unlinkSync(path.join(resourcesPath, productToDelete.main_image))  // borra main_image
            fs.unlinkSync(path.join(resourcesPath, productToDelete.image_slider1))
            fs.unlinkSync(path.join(resourcesPath, productToDelete.image_slider2))
            fs.unlinkSync(path.join(resourcesPath, productToDelete.image_slider3))
            fs.unlinkSync(path.join(resourcesPath, productToDelete.data_sheet))  // borra data sheet
            fs.unlinkSync(path.join(resourcesPath, productToDelete.install_sheet))  // borra install sheet */
    res.redirect('/product')

  },
}

module.exports = controller
