//Requiero el modelo product para poder usar todos sus metodos
const product = require('../models/product')
// se requiere express-validator, pero la parte de validation result
const { validationResult } = require('express-validator')
//funciones Auxilliares
//const { isFileImage, isPdf } = require('../helpers/files')
const { randomArray2 } = require('../helpers/utilities')
const { Product } = require('../database/models')
const { Feature } = require('../database/models')
const { Image } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const path = require('path')
const productImagePath = '/img/'


const controller = {
  list: async (req, res) => {
    const products = await Product.findAll({
      include: [
        { association: 'category' },
        {
          association: 'images',
          where: { type: 'main' }
        }
      ]
    })

    res.render('products/product-list.ejs', { products, productImagePath })
  },
  detail: async (req, res) => {
    let id = req.params.id
    //busco el producto que viaja por parametro @gonza
    //FIXME buscar explicación de porque busca category y category_id

    let productFound = await Product.findByPk(id)
    const features = await productFound.getFeatures() //uso magic method para traer las features
    const images = await productFound.getImages() //uso magic method para traer las imagenes

    //obtenro la categoría correspondiente al producto
    let categoryId = productFound.categoryId
    //Traigo todos los productos que están en la misma categoría por su id y los relaciono con la tabla feature
    let productsCategory = await Product.findAll({
      where: { categoryId },
      include: [{
        association: 'images',
        where: { type: 'main' }
      }]
    })
    //A los productos de la misma categoría le saco el que estoy viendo en detalle. Para que no me lo ponga como producto similar
    let similarProducts = productsCategory.filter((e) => e.id != id)
    //utilizando una funcion auxiliar creo un array de numeros aleatorios con maximo 3 posiciones
    let indexArray = randomArray2(similarProducts.length, 3)

    //filtro los Similar Products de forma aleatoria
    let similarProductsFiltered = similarProducts.filter((e, index) => indexArray.includes(index))
    res.render('products/product-detail.ejs', { productFound, features, images, similarProductsFiltered, productImagePath })
  },
  formNew: async (req, res) => {
    const featuresList = await Feature.findAll() // listado de todas las features
    res.render('products/product-create.ejs', { featuresList })
  },

  //FIXME CREATE PRODUCT 
  create: async (req, res) => {
    let errors = validationResult(req)
    const productNew = req.body
    const { material, cct, dim, source, optic, power } = req.body

    const { files } = req
    try {
      const newProduct = await Product.create(productNew)    /*puede que el camino sea guardar el await de arriba en una variable, destructurar lo que viaja en el body, guardar lo que corresponde al producto con el create y usar magic method de set para completar los datos de la tablas intermedia*/
      files.forEach(async images => {
        if (images.fieldname == 'main' || images.fieldname == 'slider' || images.fieldname == 'dimension') {
          await newProduct.createImage({ 'product_id': newProduct.id, 'type': images.fieldname, 'name': images.filename })
          // await Image.create({'product_id': newProduct.id, 'type': images.fieldname, 'name': images.filename })

        }

      })
      await newProduct.addFeature(material)
      await newProduct.addFeature(cct)
      await newProduct.addFeature(source)
      await newProduct.addFeature(optic)
      await newProduct.addFeature(dim)
      await newProduct.addFeature(power)
    } catch (error) {
      console.log(error)
    }

    return //corta aca para que NO pase por las validaciones
    if (errors.isEmpty()) {
      product.Create(productNew, files)
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
  edit: async (req, res) => {
    let id = req.params.id
    let productFound = await Product.findByPk(id)
    const images = await productFound.getImages() // traigo las imagenes por magic method del product encontrado
    const features = await productFound.getFeatures() // traigo las features por magic method del product encontrado
    const category = await productFound.getCategory()
    const featuresList = await Feature.findAll() // listado de todas las features
    res.render('products/product-edit.ejs', { productFound, category, images, features, featuresList, productImagePath })

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
  result: async (req, res) => {
    let keyword = req.query.keyword
    let offset = req.query.offset
    let productFound = await Product.findAll({
      where: {
        name: { [Op.like]: '%' + req.query.keyword + '%' }
      },
    })
    let product = await Product.findAll({
      limit: 12,
      offset: (typeof (offset) == 'undefined') ? Number(0) : Number(offset),
      where: {
        name: { [Op.like]: '%' + req.query.keyword + '%' }
      },
      include: [{
        association: 'images',
        where: { type: 'main' },
      }],
    })
    const nextButton = parseInt(productFound.length / 12)
    return res.render('products/product-search.ejs', { productFound, product, keyword, nextButton, productImagePath })
  }
}

module.exports = controller
