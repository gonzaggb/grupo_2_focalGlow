const { body } = require('express-validator')
const { isFileImage, isPdf } = require('../helpers/files')
//agregar las validaciones
const validateCreateForm = [
  body('name').notEmpty().withMessage('* Falta agregar nombre de producto'),
/*  body('qty').notEmpty().withMessage('* Falta agregar la cantidad de productos'),
  body('price').notEmpty().withMessage('* Falta agregar el precio del producto'),
  body('source').notEmpty().withMessage('* Falta seleccionar una fuente'),
  body('cct').notEmpty().withMessage('* Falta seleccionar el cct'),
  body('dim').notEmpty().withMessage('* Falta seleccionar el DIM'),
   body('product_img').custom(((value, { req }) => {
    const file = req.file
    if (!file) {
      throw new Error('Debes subir una imagen')
    } else if (!isFileImage(file.originalname)) {
      throw new Error(`Ingrese un archivo que sea una imágen`)
    }
    return true
  })),
  body('image_dimension').custom(((value, { req }) => {
    const file = req.file
    if (!file) {
      throw new Error('Debes subir una imagen')
    } else if (!isFileImage(file.originalname)) {
      throw new Error(`Ingrese un archivo que sea una imágen`)
    }
    return true
  })),
  body('image_slider').custom(((value, { req }) => {
    const file = req.file
    if (!file) {
      throw new Error('Debes subir una imagen')
    } else if (!isFileImage(file.originalname)) {
      throw new Error(`Ingrese un archivo que sea una imágen`)
    }
    return true
  })),
  body('data_sheet').custom(((value, { req }) => {
    const file = req.file
    if (!file) {
      throw new Error('Debes subir un pdf')
    } else if (!isPdf(file.originalname)) {
      throw new Error(`Ingrese un archivo que sea un pdf`)
    }
    return true
  })),
  body('install_sheet').custom(((value, { req }) => {
    const file = req.file
    if (!file) {
      throw new Error('Debes subir un pdf')
    } else if (!isPdf(file.originalname)) {
      throw new Error(`Ingrese un archivo que sea un pdf`)
    }
    return true
  })), */

  /*
source
material
optic
cct
dim
product_img
image_dimension
image_slider
data_sheet
install_sheet */


]
module.exports = { validateCreateForm }