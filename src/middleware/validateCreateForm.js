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
  body('quantity')
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
  body('categoryId')
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
  body('main').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('main', files)
    return true
  }),

  body('dimension').custom((value, { req }) => {
    const files = req.files
    checkFieldImage('dimension', files)
    return true
  }),

  body('slider').custom((value, { req }) => {
    const { files } = req
    checkFieldImage('slider', files)
    return true
  }),
  body('dataSheet').custom((value, { req }) => {
    const { files } = req
    checkFieldPdf('dataSheet', files)
    return true
  }),

  body('installSheet').custom((value, { req }) => {
    const { files } = req
    checkFieldPdf('installSheet', files)
    return true
  }),
]
module.exports = { validateCreateForm }
