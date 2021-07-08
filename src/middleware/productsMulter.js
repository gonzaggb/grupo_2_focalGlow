const multer = require('multer')
//requerir path
const path = require('path')


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
  const uploadProduct = multer({storage, fileFilter})

  module.exports =  uploadProduct