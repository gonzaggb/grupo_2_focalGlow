const path = require('path')
function isFileImage(fileName){
    const validExtension = ['.jpg', '.png', '.gif']
    if(validExtension.includes(path.extname(fileName))){
        return true
    }else{
        return false
    }
}

module.exports = {
    isFileImage,
}