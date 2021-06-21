const { isFileImage, isPdf } = require('./files')

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

  if (!valuesFieldname.includes(fieldName)) {
    throw new Error('Seleccione imagen para este campo')
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
    throw new Error('Seleccione documento para este campo')
  }

  return true
}

module.exports = {
  checkFieldImage,
  checkFieldPdf,
}
