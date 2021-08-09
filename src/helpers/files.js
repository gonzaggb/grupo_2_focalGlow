const path = require('path')

function isFileImage(fileName) {
  const validExtension = ['.jpg', '.JPG','JPEG','.png', '.jpeg', '.gif', 'tiff', 'bmp', 'svg']
  if (validExtension.includes(path.extname(fileName))) {
    return true
  } else {
    return false
  }
}
function isPdf(fileName) {
  const validExtension = ['.pdf']
  if (validExtension.includes(path.extname(fileName))) {
    return true
  } else {
    return false
  }
}

module.exports = {
  isFileImage,
  isPdf,
}
