const path = require('path')
function isFileImage(fileName){
    const validExtension = ['.jpg', '.png', '.jpeg', '.gif']
    if(validExtension.includes(path.extname(fileName))){
        return true
    }else{
        return false
    }
}
function isPdf(fileName){
    const validExtension = ['.pdf']
    if(validExtension.includes(path.extname(fileName))){
        return true
    }else{
        return false
    }
}

module.exports = {
    isFileImage,
    isPdf,
}
