//Requiero express y ejecuto la propiedad Router()
const express = require('express')
const router = express.Router()
//requerir multer
const multer = require('multer')
//requerir path
const path = require('path')
//requerir express-validator
const { validateCreateForm } = require('../middleware/validateCreateForm')
const { validateEditForm } = require('../middleware/validateEditForm')
//aplicacion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.png') {
      cb(null, path.join(__dirname, '../../public/img'))
    } else {
      cb(null, path.join(__dirname, '../../public/pdf'))
    }
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// para eliminar el archivo que sube multer
const fileFilter = (req, file, cb) => {
  const files = req.files
  if (!files) {
    cb(null, false)

    // corta ejecución
    return
  } else
    (files) => {
      files.forEach((e) => {
        fs.unlinkSync(e)
      })

      cb(null, false)

      // corta ejecución
      return
    }

  // Si aceptamos el archivo
  cb(null, true)
}
const upload = multer({ storage, fileFilter })

//requiero el controlador de main
const productController = require('../controllers/productController')

//Asigno a cada ruta la propiedad del controlador

//View
router.get('/list', productController.list)
router.get('/detail/:id', productController.detail)

//Create
router.get('/add', productController.formNew) //formulario de creacion de producto
router.post(
  '/add',
  upload.any(
    'main_image',
    'image_dimension',
    'data_sheet',
    'install_sheet',
    'image_slider_1',
    'image_slider_2',
    'image_slider_3'
  ),
  validateCreateForm,
  productController.create
)
// a donde va el producto creado

//Update
router.get('/:id/edit', productController.edit) //formulario de edicion de producto
router.put(
  '/:id/edit',
  upload.any(
    'main_image',
    'image_dimension',
    'data_sheet',
    'install_sheet',
    'image_slider_1',
    'image_slider_2',
    'image_slider_3'
  ),
  validateEditForm,
  productController.update
)

//Delete
router.delete('/:id', productController.delete)

module.exports = router
