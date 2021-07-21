const { isFileImage } = require('./files')

function checkFieldImage(fieldName, array) {
  let valuesFieldname = []

  array.forEach((element) => {
    valuesFieldname.push(element.fieldname)
    if (element.fieldname == fieldName) {
      if (!isFileImage(element.originalname)) {
        throw new Error('El archivo debe tener formato imagen')
      }
    }
  })



  return true
}


module.exports = {
  checkFieldImage,

}
