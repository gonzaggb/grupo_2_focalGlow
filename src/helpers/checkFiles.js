const { isFileImage, isPdf } = require('./files')

function checkFieldImage(fieldName, array) {
  let valuesFieldname = []

  array.forEach((element) => {
    valuesFieldname.push(element.fieldname)
    if (element.fieldname == fieldName) {
      if (!isFileImage(element.originalname)) {
        throw new Error('Ingrese un archivo que sea una imágen')
      }
    }
  })

  if (!valuesFieldname.includes(fieldName)) {
    throw new Error('Debes subir una imagen')
  }

  return true
}

function checkFieldPdf(fieldName, array) {
  let valuesFieldname = []

  array.forEach((element) => {
    valuesFieldname.push(element.fieldname)
    if (element.fieldname == fieldName) {
      if (!isPdf(element.originalname)) {
        throw new Error('Ingrese un archivo que sea formato PDF')
      }
    }
  })

  if (!valuesFieldname.includes(fieldName)) {
    throw new Error('Debes subir un documento')
  }

  return true
}

module.exports = {
  checkFieldImage,
  checkFieldPdf,
}
