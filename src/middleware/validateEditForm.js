const { body } = require('express-validator')
const { checkFieldImage, checkFieldPdf } = require('../helpers/checkFiles')

//agregar las validaciones
const validateEditForm = [
    body('name').notEmpty().withMessage('Favor de indicar el nombre de producto'),
    body('qty').notEmpty().withMessage('Favor de indicar la cantidad de productos'),
    body('price').notEmpty().withMessage('Favor de indicar el precio del producto'),
    body('source').notEmpty().withMessage('Favor de seleccionar una fuente'),
    body('cct').notEmpty().withMessage('Favor de seleccionar el CCT'),
    body('dim').notEmpty().withMessage('Favor de seleccionar el DIM'),
    body('material').notEmpty().withMessage('Favor de seleccionar el material'),
    body('optic').notEmpty().withMessage('Favor de seleccionar la óptica'),
    body('category').notEmpty().withMessage('Favor de seleccionar una categoría'),
    body('description').notEmpty().withMessage('Favor de incluir una descripción del producto'),
    /* body('power').notEmpty().withMessage('Favor de incluir una potencia'), */
]

module.exports = { validateEditForm }