const multer = require('multer')
//requerir path
const path = require('path')


//aplicacion de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    if (path.extname(file.originalname) == '.pdf') {
      cb(null, path.join(__dirname, '../../public/pdf'))
    } else {
      cb(null, path.join(__dirname, '../../public/img'))
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
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
const uploadProduct = multer({ storage, fileFilter })

module.exports = uploadProduct