const { body } = require('express-validator')
const { checkFieldImage, checkFieldPdf } = require('../helpers/checkFiles')

//agregar las validaciones
const validateCreateForm = [
  body('name')
    .notEmpty()
    .withMessage('Favor de indicar el nombre de producto')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Por favor un nombre más largo'),
  body('qty')
    .notEmpty()
    .withMessage('Favor de indicar la cantidad de productos'),
  body('price')
    .notEmpty()
    .withMessage('Favor de indicar el precio del producto'),
  body('source')
    .notEmpty()
    .withMessage('Favor de seleccionar una fuente'),
  body('cct')
    .notEmpty()
    .withMessage('Favor de seleccionar el CCT'),
  body('dim')
    .notEmpty()
    .withMessage('Favor de seleccionar el DIM'),
  body('material')
    .notEmpty()
    .withMessage('Favor de seleccionar el material'),
  body('optic')
    .notEmpty()
    .withMessage('Favor de seleccionar la óptica'),
  body('category')
    .notEmpty()
    .withMessage('Favor de seleccionar una categoría'),
  body('description')
    .notEmpty()
    .withMessage('Favor de incluir una descripción del producto')
    .bail()
    .isLength({ min: 20 })
    .withMessage('Por favor agregar una descripcion mas larga'),
  body('power')
    .notEmpty()
    .withMessage('Favor de incluir una potencia'),

  //Para las imagenes y pdf llamamos a una funcion auxiliadora
  body('main_image').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('main_image', files)
    return true
  }),

  body('image_dimension').custom((value, { req }) => {
    const files = req.files
    checkFieldImage('image_dimension', files)
    return true
  }),

  body('image_slider1').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('image_slider1', files)
    return true
  }),

  body('image_slider2').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('image_slider2', files)
    return true
  }),

  body('image_slider3').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('image_slider3', files)
    return true
  }),

  body('data_sheet').custom((value, { req }) => {
    const { files } = req
    checkFieldPdf('data_sheet', files)
    return true
  }),

  body('install_sheet').custom((value, { req }) => {
    const { files } = req
    checkFieldPdf('install_sheet', files)
    return true
  }),
]
module.exports = { validateCreateForm }
