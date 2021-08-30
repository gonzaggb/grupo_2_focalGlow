const multer = require('multer')
const path = require('path')
const files = require('../helpers/files')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/profile-pictures'))

    },
    filename: (req, file, cb) => {
        const extensionFile = path.extname(file.originalname)
        cb(null, `profile-${Date.now()}${extensionFile}`)
    }

})
const fileFilter = (req, file, cb) => {
    if (!files.isFileImage(file.originalname)) { //evalua que el archivo sea una imagen
        req.file = file
        cb(null, false)
        return
    } else {
        // Si aceptamos el archivo
        cb(null, true)
        return

    }
}

const uploadRegister = multer({ storage, fileFilter })

module.exports = uploadRegister
