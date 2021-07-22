const { isFileImage, isPdf } = require('./files')

function checkFieldImage(fieldName, array) {
  let valuesFieldname = []

  array.forEach((element) => {
    if (element.fieldname == fieldName) {
      valuesFieldname.push(element.fieldname)
      if (!isFileImage(element.originalname)) {
        throw new Error('El archivo debe tener formato imagen')
      }
    }
  })

  if ((valuesFieldname.length < 1) && fieldName == 'slider') {
    throw new Error('Seleccione al menos una imagen para el slider')
    }
    if(valuesFieldname.length < 1){
        throw new Error('Seleccione una imagen ')
    }
  return true
}

function checkFieldPdf(fieldName, array) {
  let valuesFieldname = []
  array.forEach((element) => {
    if (element.fieldname == fieldName) {
      valuesFieldname.push(element.fieldname)
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
