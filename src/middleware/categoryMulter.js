//middleware que sirve para la carga de archivos para Category

const multer = require('multer')
const path = require('path')

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

const uploadRegister = multer({ storage })

module.exports = uploadRegister
