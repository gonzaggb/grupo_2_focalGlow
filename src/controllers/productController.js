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
const { File } = require('../database/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const path = require('path')
const productImagePath = '/img/'
const productFilePath = '/pdf/'

function addProductImagePath(element) {
  return element.dataValues.name = productImagePath + element.name
}

function addProductFilePath(element) {
  return element.dataValues.name = productFilePath + element.name
}

const controller = {
  list: async (req, res) => {
    const products = await Product.findAll({
      include: [{ association: 'category' },
      {
        association: 'images',
        where: { type: 'main' },
      }],
      order: [
        ['category', 'name']
      ]
    })

    //AGREGO RUTA A LAS IMAGENES
    products.forEach(product => {
      product.images.forEach(image => {
        addProductImagePath(image)
      })
    })

    res.render('products/product-list.ejs', { products })
  },

  detail: async (req, res) => {
    let id = req.params.id
    //busco el producto que viaja por parametro @gonza

    let product = await Product.findByPk(id, {
      include: [
        { association: 'images' },
        { association: 'features' },
        { association: 'files' },
        { association: 'category' }
      ]
    })

    //AGREGO LA RUTA A LAS IMAGENES Y CREO EL ARRAY SLIDER
    let arraySlider = []

    product.images.forEach(image => {
      addProductImagePath(image)
      if (image.type == 'slider') {
        arraySlider.push(image.name)
      }
    })

    //AGREGO LA RUTA A LOS ARCHIVOS
    product.files.forEach(file => {
      addProductFilePath(file)
    })

    //res.send(product)
    const features = await product.getFeatures() //uso magic method para traer las features
    const images = await product.getImages() //uso magic method para traer las imagenes
    //obtenro la categoría correspondiente al producto
    let categoryId = product.categoryId
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
    //agrego la ruta a las imagenes
    similarProducts.forEach(product => {
      product.images.forEach(image => {
        addProductImagePath(image)
      })
    })

    //utilizando una funcion auxiliar creo un array de numeros aleatorios con maximo 3 posiciones
    let indexArray = randomArray2(similarProducts.length, 3)

    //filtro los Similar Products de forma aleatoria
    let similarProductsFiltered = similarProducts.filter((e, index) => indexArray.includes(index))

    res.render('products/product-detail.ejs', { product, similarProductsFiltered, arraySlider })
  },

  formNew: async (req, res) => {
    const featuresList = await Feature.findAll() // listado de todas las features
    res.render('products/product-create.ejs', { featuresList })
  },

  create: async (req, res) => {
    const featuresList = await Feature.findAll() // listado de todas las features
    let errors = validationResult(req)
    const productInfo = req.body
    const { material, cct, dim, source, optic, power } = req.body
    const { files } = req

    /*Si mandan una sola potencia no llega como array, es por eso que la convierto*/
    const powerId = Array.isArray(power) ? power : [power]
    productInfo.power = powerId
    if (errors.isEmpty()) {
      try {
        //creo array para guardar las imagenes juntas

        const newProduct = await Product.create(productInfo)

        files.forEach(async file => {
          if (file.fieldname == 'main' || file.fieldname == 'dimension') {
            await newProduct.createImage({ 'product_id': newProduct.id, 'type': file.fieldname, 'name': file.filename })
            // await Image.create({'product_id': newProduct.id, 'type': images.fieldname, 'name': images.filename })
          }
          //creo un array con todas las imagenes que van al slider
          if (file.fieldname == 'slider') {
            await newProduct.createImage({ 'product_id': newProduct.id, 'type': file.fieldname, 'name': file.filename })
          }
          /*Modificar en la base de datos los ENUM para que los tome la línea 81*/
          if (file.fieldname == 'installSheet' || file.fieldname == 'dataSheet') {
            await File.create({ 'productId': newProduct.id, 'type': file.fieldname, 'name': file.filename })
            /*MODIFIQUE EN EL CONFIG DE FILE.JS LA FOREING KEY, SACANDOLE EL '_' Y AGREGANDO EL UNDERSCORED TRUE AL CONFIG*/
          }
        })


        await newProduct.addFeature(material)
        await newProduct.addFeature(cct)
        await newProduct.addFeature(source)
        await newProduct.addFeature(optic)
        await newProduct.addFeature(dim)
        await newProduct.addFeature(powerId)

        res.redirect('/product')

      } catch (error) {
        console.log(error)
      }
    } else {
      /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la creación del producto*/
      files.forEach(e => {
        fs.unlinkSync(e.path)
      })
      res.render('products/product-create.ejs', { errors: errors.mapped(), old: productNew, featuresList })
    }
  },


  edit: async (req, res) => {
    let id = req.params.id
    let productFound = await Product.findByPk(id)
    const images = await productFound.getImages() // traigo las imagenes por magic method del product encontrado
    const features = await productFound.getFeatures() // traigo las features por magic method del product encontrado
    const category = await productFound.getCategory()
    const featuresList = await Feature.findAll() // listado de todas las features
    res.render('products/product-edit.ejs', { productFound, category, images, features, featuresList, productImagePath })

  },


  update: async (req, res) => {
    let errors = validationResult(req)
    let id = req.params.id
    let productFound = await Product.findByPk(id)
    let { files } = req
    const { material, cct, dim, source, optic, power, sliderUpdate } = req.body
    const data = req.body
    const powerId = Array.isArray(power) ? power : [power]
    productFound.power = powerId
    if (errors.isEmpty()) {
      try {
        /*Actualizo el producto en la tabla producto*/
        await Product.update(
          data,
          { where: { id } }
        )
        /*Actualizo las features y creo la relación con las tablas intermedias*/
        /**Para esto hago un array con todos los valores a modificar, ASEGURAR QUE LOS CAMPOS NO VIAJEN VACIOS */

        const featuresUpdate = material.concat(dim, source, cct, optic, powerId)
        await productFound.setFeatures(featuresUpdate)


        const productImages = await productFound.getImages() // traigo la imagenes del producto
        var slider = []
        var mainImage = ''
        var dimension = ''
        var installSheet = ''
        var dataSheet = ''
        //recorro lo archivos que viajan en el update y los guardo en las variables creadas previamente según corresponda
        files.forEach(file => {
          switch (file.fieldname) {
            case 'main':
              mainImage = file.filename
              break;
            case 'dimension':
              dimension = file.filename
              break;
            case 'slider':
              //si el usuario quiere modificar todas las imagenes creo un array al cual voy pusheando las imagenes que vienen del files
              if (sliderUpdate == 'modifyAll') {
                slider.push(file.filename)
              }
              var actualImage = ''
              //si el usuario desea agregar una imagen, busco el nombre actual y le agrego el nombre de las nuevas imagenes
              if (sliderUpdate == 'addImages') {
                productImages.forEach(image => {
                  if (image.type == 'slider') {
                    actualImage = image.name
                  }
                })
                slider = actualImage + ',' + file.filename
              }
              break;
            case 'installSheet':
              installSheet = file.filename
              break;
            case 'dataSheet':
              dataSheet = file.filename
              break;
            default:
          }
        })
        //actualizo la main image en la DB
        if (mainImage != '') {
          await Image.update(
            { name: mainImage },
            { where: { productId: id, type: 'main' } },
          )
        }
        //actualizo la image dimendion en la DB
        if (dimension != '') {
          await Image.update(
            { name: dimension },
            { where: { productId: id, type: 'dimension' } },
          )
        }
        // FIXME @gonza actualizo la image slider en la DB - AHORA SE GUARDA COMO UN ARRAY, POR LO QUE DEBEMOS MODIFICAR LA FORMA DE LEER LOS DATOS EN LOS EJS y modificar la DB
        if (slider.length > 0) {
          await Image.update(
            { name: slider },
            { where: { productId: id, type: 'slider' } },
          )
        }

        // FIXME @gonza actualizo la dataSheet en la DB - validar que los files tengan definido dataSheet en DB
        if (dataSheet != '') {
          await File.update(
            { name: dataSheet }, //asegurarse que en el ejs se llame de este modo
            { where: { productId: id, type: 'dataSheet' } },
          )
        }
        // FIXME @gonza actualizo la dataSheet en la DB - validar que los files tengan definido instalSheet en DB
        if (installSheet != '') {
          await File.update(
            { name: installSheet }, //asegurarse que en el ejs se llame de este modo
            { where: { productId: id, type: 'installSheet' } },
          )
        }
        res.redirect('/product')
      } catch (error) {
        console.log(error)
      }
    }
    /*borra los archivos que se guardaron en el servidor pero no se registraron por haber un error en la edicion del producto*/
    files.forEach(e => {
      fs.unlinkSync(e.path)
    })
    const featuresList = await Feature.findAll() // listado de todas las features
    const features = await productFound.getFeatures() // traigo las features por magic method del product encontrado
    const images = await productFound.getImages() // traigo las imagenes por magic method del product encontrado
    res.render('products/product-edit.ejs', { errors: errors.mapped(), productFound, featuresList, features, productImagePath, images })
  },

  delete: async (req, res) => {
    let id = req.params.id
    let productToDelete = await Product.findByPk(id, {

    })


    let featuresToDelete = await productToDelete.getFeatures()
    let imagesToDelete = await productToDelete.getImages()
    let filesToDelete = await productToDelete.getFiles()



    try {
      //borro las relaciones de tablas intermedias
      await productToDelete.removeFeature(featuresToDelete)

      // borra las imagenes asociadas al producto
      await Image.destroy({
        where: { productId: id }
      })
      await File.destroy({
        where: { productId: id }
      })
      // borra el producto
      await Product.destroy(
        { where: { id } }
      )
      /*ELIMINO TODAS LOS ARCHIVOS ASOCIADOS*/

      const resourcesPath = path.join(__dirname, '../../public')
      // borra todas las imagenes asociadas al producto del servidor
      imagesToDelete.forEach(image => {
        fs.unlinkSync(path.join(resourcesPath, '/img/', image.name))
      })
      // borra todoss los archivos asociados al producto del servidor
      filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(resourcesPath, '/pdf/', file.name))
      })
    } catch (error) {
      console.log(error)
    }

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
  },
  
}

module.exports = controller
