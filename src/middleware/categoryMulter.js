const multer = require('multer')
const path = require('path')
const files = require('../helpers/files')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let folder = path.join(__dirname, '../../public/img/categories')

		cb(null, folder)

	},
	filename: (req, file, cb) => {
		const extensionFile = path.extname(file.originalname)

		let name = ''

		switch (file.fieldname) {
			case 'imageCover': name = 'cover'
				break
			case 'imageHome': name = 'home'
				break
			default:
		}
		cb(null, `${name}-${Date.now()}${extensionFile}`)
	}
}
)

/*const fileFilter = (req, file, cb) => {
	console.log(file)
	if (!files.isFileImage(file.originalname)) { //evalua que el archivo sea una imagen
		req.file = file
		cb(null, false)
		return
	} else {
		// Si aceptamos el archivo
		cb(null, true)
		return

	}
}*/

const uploadRegister = multer({ storage/*, *fileFilter*/ })

module.exports = uploadRegister
