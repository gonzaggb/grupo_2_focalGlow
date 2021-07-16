const { body } = require('express-validator')
const files = require('../helpers/files')
const userModel = require('../models/user')
const validations = [
    body('name').notEmpty().withMessage('Debes ingresar el nombre de la categoría').bail(),

    body('coverImg').custom((value, { req }) => {
        const file = req.file
        if (file && !files.isFileImage(file.originalname)) {
            throw new Error(`Ingrese un archivo que sea una imagen`)
        }
        return true
    })
]

module.exports = validations