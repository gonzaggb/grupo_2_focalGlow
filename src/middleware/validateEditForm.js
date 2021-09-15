//MIDDLEWARE CON EXPRESS VALIDATOR PARA CHEQUEAR LOS DISTINTOS CAMPOS DEL FORMULARIO DE EDICION DE PRODUCTO

const { body } = require('express-validator')
const { checkFieldImage, checkFieldPdf } = require('../helpers/checkFiles')
const { Product } = require('../database/models')

//agregar las validaciones
const validateEditForm = [
    body('name')
        .notEmpty()
        .withMessage('Favor de indicar el nombre de producto')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Por favor un nombre más largo'),
    body('name').custom(async (value, { req }) => {
        const product = await Product.findOne(
            { where: { name: req.body.name } }
        )

        const productName = await Product.findByPk(req.params.id)
        if (product && product.name != productName.name) {
            return Promise.reject('El nombre del producto ya se encuentra en la lista')
        }

        return true
    }),
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
    body('slider').custom((value, { req }) => {
        const { files } = req
        files.forEach(file => {
            //si existe imagen para slider y no vino seleccionado el checkbox de carga, devuelve error
            if (file.fieldname == 'slider' && !req.body.sliderUpdate)
                throw new Error('Debes seleccionar una opcion')

        })
        if (req.body.sliderUpdate) {
            checkFieldImage('slider', files)

        }

        return true
    }),

]

module.exports = { validateEditForm }