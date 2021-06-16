const { body } = require('express-validator')

const validations = [
    body('name').notEmpty().withMessage('Debes poner tu nombre'),
    body('surname').notEmpty().withMessage('Debes poner tu apellido'),
    body('email').notEmpty().withMessage('Debes poner tu email').bail().isEmail().withMessage("El email ingresado no es valido"),
    body('password').notEmpty().withMessage('Debes poner una contraseña'),
    body('rePassword').notEmpty().withMessage('Debes confirmar la contraseña'),
    body('profileImg').custom((value, { req }) => {
        const file = req.file
        const validExtension = ['.jpg', '.png', '.gif']
        if (!file) {
            throw new Error('Debes subir una imagen')
        } else if (!validExtension.includes(path.extname(file.originalname))) {
            throw new Error(`Las extensions permitidas son ${validExtension.join(', ')}`)
        }
        return true
    })

]

module.exports = validations