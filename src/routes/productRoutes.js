//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
//requerir multer
const multer = require('multer')
//requerir path
const path = require('path')
//requerir express-validator
const{body} = require('express-validator')
//agregar las validaciones
const validateCreateForm = [
  body('name').notEmpty().withMessage('* Falta agregar nombre de producto'),
  body('qty').notEmpty().withMessage('* Falta agregar la cantidad de productos'),
  body('price').notEmpty().withMessage('* Falta agregar el precio del producto'),
]

//aplicacion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.png') {
      /* console.log(path.extname(file.originalname)) */
      cb(null, path.join(__dirname, '../../public/img'))
    } else {
      cb(null, path.join(__dirname, '../../public/pdf'))
    }
  },
  filename: (req, file, cb) => {
    let category = req.body.category
    cb(null, category + Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({ storage })

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador

//View
router.get('/list', productController.list)
router.get('/detail/:id', productController.detail)

//Create
router.get('/add', productController.formNew) //formulario de creacion de producto
router.post('/add', validateCreateForm , upload.any('product_img', 'data_sheet', 'install_sheet', 'image_slider', 'image_dimension'),productController.create)
// a donde va el producto creado

//Update
router.get('/:id/edit', productController.edit) //formulario de edicion de producto
router.put('/:id/edit', upload.any('product_img', 'data_sheet', 'install_sheet', 'image_slider', 'image_dimension'), productController.update)

//Delete
router.delete('/:id', productController.delete)

module.exports = router
